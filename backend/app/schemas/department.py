from pydantic import BaseModel
from enum import Enum

class DepartmentPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class DepartmentBase(BaseModel):
    name: str
    linen_quota: int = 100
    priority: DepartmentPriority = DepartmentPriority.MEDIUM
    auto_reorder_threshold: int = 20

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(BaseModel):
    name: str | None = None
    linen_quota: int | None = None
    priority: DepartmentPriority | None = None
    auto_reorder_threshold: int | None = None

class Department(DepartmentBase):
    id: int

    class Config:
        from_attributes = True