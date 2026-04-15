# app/models/_notification.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean
from app.db._database import Base
from datetime import datetime


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)

    # Type: demand_change | meeting_scheduled | progress_alert | task_assigned | general
    type = Column(String, nullable=False, default="general")

    title = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False, nullable=False)

    # Source actor (who/what triggered it)
    triggered_by = Column(String, nullable=True)  # e.g. "admin", "agent", "client"

    created_at = Column(DateTime, default=datetime.utcnow)
    read_at = Column(DateTime, nullable=True)
