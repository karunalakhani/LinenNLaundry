from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class LossReason(str, Enum):
    LOST = "lost"
    DAMAGED = "damaged"
    STOLEN = "stolen"
    WEAR_AND_TEAR = "wear_and_tear"

class LossStatus(str, Enum):
    PENDING = "pending"
    INVESTIGATING = "investigating"
    RESOLVED = "resolved"
    REPLACED = "replaced"

class LossReportBase(BaseModel):
    linen_id: int
    department_id: int
    quantity: int = 1
    reason: LossReason
    description: str
    reported_by: str
    replacement_cost: Optional[float] = None

class LossReportCreate(LossReportBase):
    pass

class LossReportUpdate(BaseModel):
    status: Optional[LossStatus] = None
    resolution_notes: Optional[str] = None
    replacement_cost: Optional[float] = None

class LossReport(LossReportBase):
    id: int
    status: LossStatus
    report_date: datetime
    resolution_notes: Optional[str] = None
    resolved_date: Optional[datetime] = None

    class Config:
        from_attributes = True