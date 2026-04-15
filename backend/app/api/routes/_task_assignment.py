# app/api/routes/_task_assignment.py
from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core._deps import get_db, get_current_user
from app.models._employee_profile import EmployeeProfile
from app.models._task_assignment import TaskAssignment
from app.models._task import Task
from app.models._meeting import Meeting
from app.models._notification import Notification
from app.models._user import User
from app.schemas._task_assignment import TaskAssignmentRead

router = APIRouter(prefix="/task-assignments", tags=["Task Assignments"])


@router.get("", response_model=List[TaskAssignmentRead])
def list_task_assignments(
    task_id: Optional[int] = None,
    employee_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(TaskAssignment)
    if task_id is not None:
        query = query.filter(TaskAssignment.task_id == task_id)
    if employee_id is not None:
        query = query.filter(TaskAssignment.employee_id == employee_id)
    if current_user.role == "employee":
        profile = db.query(EmployeeProfile).filter(EmployeeProfile.user_id == current_user.id).first()
        query = query.filter(TaskAssignment.employee_id == (profile.id if profile else -1))
    return query.order_by(TaskAssignment.assigned_at.desc()).all()


# ─────────────────────────────────────────────
# FEATURE: Kickoff Meeting Gate
# ─────────────────────────────────────────────
@router.post("", response_model=TaskAssignmentRead)
def create_task_assignment(
    task_id: int,
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Assign a task to an employee.
    GATE: A completed planning/kickoff meeting must exist for the project first.
    """
    if current_user.role not in ("admin",):
        raise HTTPException(status_code=403, detail="Only admins can assign tasks")

    # Resolve the task
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # ── KICKOFF MEETING GATE ──────────────────────────────────────────────────
    kickoff = db.query(Meeting).filter(
        Meeting.project_id == task.project_id,
        Meeting.meeting_type.in_(["planning", "kickoff"]),
        Meeting.completed_at.isnot(None),
    ).first()

    if not kickoff:
        raise HTTPException(
            status_code=409,
            detail=(
                "A completed kickoff or planning meeting is required before assigning tasks. "
                "Please schedule and complete a planning meeting for this project first."
            ),
        )
    # ─────────────────────────────────────────────────────────────────────────

    # Check employee profile exists
    profile = db.query(EmployeeProfile).filter(EmployeeProfile.id == employee_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Employee profile not found")

    # Prevent duplicate assignment
    existing = db.query(TaskAssignment).filter(
        TaskAssignment.task_id == task_id,
        TaskAssignment.employee_id == employee_id,
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Task is already assigned to this employee")

    assignment = TaskAssignment(
        task_id=task_id,
        employee_id=employee_id,
        assigned_at=datetime.utcnow(),
        assigned_by=current_user.id,
    )
    db.add(assignment)

    # Send notification to assigned employee
    if profile.user_id:
        db.add(Notification(
            user_id=profile.user_id,
            project_id=task.project_id,
            task_id=task_id,
            type="task_assigned",
            title=f"📋 New task assigned: {task.title}",
            body=f"You have been assigned to task \"{task.title}\". "
                 f"Kickoff meeting outcomes have been recorded — please review your responsibilities.",
            triggered_by="admin",
        ))

    db.commit()
    db.refresh(assignment)
    return assignment
