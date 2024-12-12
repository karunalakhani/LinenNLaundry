from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from enum import Enum

class ProcessStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class ProcessStepBase(BaseModel):
    name: str
    assigned_to: Optional[str] = None
    notes: Optional[str] = None

class ProcessStepCreate(ProcessStepBase):
    pass

class ProcessStep(ProcessStepBase):
    id: int
    process_id: int
    status: ProcessStatus
    start_time: Optional[datetime]
    end_time: Optional[datetime]

    class Config:
        from_attributes = True

class LaundryProcessBase(BaseModel):
    order_id: int
    current_step: str
    assigned_to: Optional[str] = None
    notes: Optional[str] = None

class LaundryProcessCreate(LaundryProcessBase):
    steps: List[ProcessStepCreate]

class LaundryProcess(LaundryProcessBase):
    id: int
    start_time: datetime
    estimated_completion: datetime
    steps: List[ProcessStep]

    class Config:
        from_attributes = True