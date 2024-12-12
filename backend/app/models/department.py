from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum

class DepartmentPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    linen_quota = Column(Integer, default=100)
    priority = Column(Enum(DepartmentPriority), default=DepartmentPriority.MEDIUM)
    auto_reorder_threshold = Column(Integer, default=20)

    linens = relationship("Linen", back_populates="department")
    laundry_orders = relationship("LaundryOrder", back_populates="department")