# app/schemas/_notification.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class NotificationRead(BaseModel):
    id: int
    user_id: int
    project_id: Optional[int] = None
    task_id: Optional[int] = None
    type: str
    title: str
    body: str
    is_read: bool
    triggered_by: Optional[str] = None
    created_at: datetime
    read_at: Optional[datetime] = None

    class Config:
        from_attributes = True
