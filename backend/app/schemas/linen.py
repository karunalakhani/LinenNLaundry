from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class LinenStatus(str, Enum):
    AVAILABLE = "available"
    IN_USE = "in_use"
    IN_LAUNDRY = "in_laundry"
    DAMAGED = "damaged"

class LinenCondition(str, Enum):
    NEW = "new"
    GOOD = "good"
    FAIR = "fair"
    POOR = "poor"

class LinenBase(BaseModel):
    serial_number: str
    type: str
    status: LinenStatus = LinenStatus.AVAILABLE
    condition: LinenCondition = LinenCondition.NEW
    department_id: Optional[int] = None

class LinenCreate(LinenBase):
    pass

class LinenUpdate(BaseModel):
    status: Optional[LinenStatus] = None
    condition: Optional[LinenCondition] = None
    department_id: Optional[int] = None

class Linen(LinenBase):
    id: int
    last_used: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True