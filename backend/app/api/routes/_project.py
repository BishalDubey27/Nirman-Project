# app/api/routes/_project.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from app.db._database import get_db
from app.schemas._project import ProjectCreate, ProjectInviteResponse, ProjectPaymentUpdate, TeamApprovalAction
from app.services._project_service import (
    build_project_status,
    create_project,
    delete_project_atomic,
    get_clients,
    get_projects,
    handle_team_approval,
    handle_project_invite_response,
    update_project_payment_status,
)
from app.core._deps import get_current_user
from app.models._project import Project
from app.models._task import Task
from app.models._task_progress import TaskProgress
from app.models._task_assignment import TaskAssignment
from app.models._notification import Notification
from app.models._communication import Communication
from app.core._logging import get_logger

router = APIRouter(prefix="/projects", tags=["Projects"])
logger = get_logger(__name__)


class ScopeChangePayload(BaseModel):
    change_summary: str
    updated_requirements: Optional[str] = None
    change_reason: Optional[str] = None


@router.post("/")
def create(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    logger.info(f"Creating project: name={project.name}, user_id={user.id}")
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create projects")
    try:
        result = create_project(db, project, admin=user)
        logger.info(f"Project created: project_id={result.id if hasattr(result, 'id') else 'unknown'}")
        return result
    except Exception as e:
        logger.error(f"Failed to create project: {e}", exc_info=True)
        raise


@router.get("/")
def read_all(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return get_projects(db, viewer=user)


@router.get("/clients")
def read_clients(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can view clients")
    return get_clients(db, user)


@router.get("/{project_id}/status")
def read_project_status(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return build_project_status(db, project_id, viewer=user)


# ─────────────────────────────────────────────
# FEATURE: Progress Summary (Progress Tracking)
# ─────────────────────────────────────────────
@router.get("/{project_id}/progress-summary")
def get_progress_summary(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    """
    Aggregates task-level progress into a project-level health summary.
    Returns overall %, task counts by status, budget usage, and health.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    tasks = db.query(Task).filter(Task.project_id == project_id).all()
    total = len(tasks)

    budget_used_pct = round((project.spent / project.budget * 100), 1) if project.budget else 0
    days_remaining = (project.deadline - datetime.utcnow()).days if project.deadline else None

    if total == 0:
        return {
            "project_id": project_id,
            "project_name": project.name,
            "overall_progress": 0,
            "tasks_total": 0,
            "tasks_completed": 0,
            "tasks_in_progress": 0,
            "tasks_blocked": 0,
            "tasks_on_track": 0,
            "tasks_delayed": 0,
            "budget_used_pct": budget_used_pct,
            "days_remaining": days_remaining,
            "health": "healthy",
            "milestones": [],
        }

    task_ids = [t.id for t in tasks]
    progress_records = db.query(TaskProgress).filter(TaskProgress.task_id.in_(task_ids)).all()
    progress_map = {p.task_id: p for p in progress_records}

    completed = [t for t in tasks if t.status == "completed"]
    in_progress = [t for t in tasks if t.status == "in-progress"]
    blocked = [t for t in tasks if t.status == "blocked"]
    delayed = [p for p in progress_records if p.is_on_track == 0]
    on_track = [p for p in progress_records if p.is_on_track == 1]

    completion_pcts = [
        progress_map[t.id].completion_percentage if t.id in progress_map else 0
        for t in tasks
    ]
    overall_progress = round(sum(completion_pcts) / total, 1)

    # Health = critical / at_risk / healthy
    health = "healthy"
    if len(delayed) >= 2 or budget_used_pct > 90 or (days_remaining is not None and days_remaining <= 0):
        health = "critical"
    elif len(delayed) >= 1 or budget_used_pct > 70 or (days_remaining is not None and days_remaining <= 5):
        health = "at_risk"

    milestones = []
    for t in tasks:
        if t.deadline:
            p = progress_map.get(t.id)
            milestones.append({
                "task_id": t.id,
                "title": t.title,
                "deadline": t.deadline.isoformat(),
                "completion_pct": p.completion_percentage if p else 0,
                "status": t.status,
                "is_on_track": p.is_on_track if p else 1,
            })

    return {
        "project_id": project_id,
        "project_name": project.name,
        "overall_progress": overall_progress,
        "tasks_total": total,
        "tasks_completed": len(completed),
        "tasks_in_progress": len(in_progress),
        "tasks_blocked": len(blocked),
        "tasks_on_track": len(on_track),
        "tasks_delayed": len(delayed),
        "budget_used_pct": budget_used_pct,
        "days_remaining": days_remaining,
        "health": health,
        "milestones": milestones,
    }


# ─────────────────────────────────────────────
# FEATURE: Client Demand Change Pipeline
# ─────────────────────────────────────────────
@router.patch("/{project_id}/scope-change")
def handle_scope_change(
    project_id: int,
    payload: ScopeChangePayload,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    """
    Client demand change pipeline:
    1. Update project description/requirements
    2. Log a Communication audit record
    3. Broadcast a Notification to every team member on this project
    """
    if user.role not in ("admin", "client"):
        raise HTTPException(status_code=403, detail="Only admins or clients can submit scope changes")

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # 1. Update project requirements
    if payload.updated_requirements:
        project.description = payload.updated_requirements
    cf = project.custom_fields or {}
    cf["scope_version"] = cf.get("scope_version", 0) + 1
    cf["last_scope_change"] = datetime.utcnow().isoformat()
    cf["last_scope_change_by"] = user.full_name or user.email
    project.custom_fields = cf
    db.add(project)

    # 2. Log communication record
    comm = Communication(
        type="demand_change",
        from_actor=user.role,
        to_actor="project_team",
        subject=f"[Scope Change v{cf['scope_version']}] {project.name}",
        body=payload.change_summary,
        project_id=project_id,
        status="sent",
    )
    db.add(comm)

    # 3. Find all employees with task assignments on this project
    task_ids = [t.id for t in db.query(Task).filter(Task.project_id == project_id).all()]
    notified_users = set()

    if task_ids:
        from app.models._employee_profile import EmployeeProfile
        assignments = db.query(TaskAssignment).filter(TaskAssignment.task_id.in_(task_ids)).all()
        for assignment in assignments:
            profile = db.query(EmployeeProfile).filter(
                EmployeeProfile.id == assignment.employee_id
            ).first()
            if profile and profile.user_id and profile.user_id not in notified_users:
                notified_users.add(profile.user_id)
                notif = Notification(
                    user_id=profile.user_id,
                    project_id=project_id,
                    type="demand_change",
                    title=f"⚠️ Client requirements updated — {project.name}",
                    body=payload.change_summary + (
                        f"\n\nReason: {payload.change_reason}" if payload.change_reason else ""
                    ),
                    triggered_by=user.role,
                )
                db.add(notif)

    # Notify the project admin too (if they're not the one making the change)
    if project.admin_id != user.id and project.admin_id not in notified_users:
        db.add(Notification(
            user_id=project.admin_id,
            project_id=project_id,
            type="demand_change",
            title=f"⚠️ Scope change submitted — {project.name}",
            body=f"Submitted by {user.full_name or user.email}: {payload.change_summary}",
            triggered_by=user.role,
        ))

    db.commit()
    db.refresh(project)

    logger.info(f"Scope change for project {project_id}: {len(notified_users)} member(s) notified")
    return {
        "success": True,
        "project_id": project_id,
        "scope_version": cf["scope_version"],
        "notified_count": len(notified_users),
        "message": f"Scope change logged. {len(notified_users)} team member(s) notified.",
    }


@router.post("/{project_id}/team-approval")
def act_on_team_approval(
    project_id: int,
    payload: TeamApprovalAction,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can confirm project team approval")
    return handle_team_approval(db=db, project_id=project_id, approved=payload.approved, note=payload.note, actor_id=user.id)


@router.post("/{project_id}/invite-response")
def respond_to_project_invite(
    project_id: int,
    payload: ProjectInviteResponse,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return handle_project_invite_response(db=db, project_id=project_id, accepted=payload.accepted, note=payload.note, actor=user)


@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return delete_project_atomic(db, project_id, user)


@router.patch("/{project_id}/payment-status")
def update_payment_status(
    project_id: int,
    payload: ProjectPaymentUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return update_project_payment_status(db=db, project_id=project_id, payment_status=payload.payment_status, note=payload.note, actor=user)
