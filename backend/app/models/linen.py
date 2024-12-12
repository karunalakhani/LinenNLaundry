from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import enum

class LinenStatus(str, enum.Enum):
    AVAILABLE = "available"
    IN_USE = "in_use"
    IN_LAUNDRY = "in_laundry"
    DAMAGED = "damaged"

class LinenCondition(str, enum.Enum):
    NEW = "new"
    GOOD = "good"
    FAIR = "fair"
    POOR = "poor"

class Linen(Base):
    __tablename__ = "linens"

    id = Column(Integer, primary_key=True, index=True)
    serial_number = Column(String, unique=True, index=True)
    type = Column(String)
    status = Column(Enum(LinenStatus), default=LinenStatus.AVAILABLE)
    condition = Column(Enum(LinenCondition), default=LinenCondition.NEW)
    department_id = Column(Integer, ForeignKey("departments.id"))
    last_used = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    department = relationship("Department", back_populates="linens")
    laundry_orders = relationship("LaundryOrderItem", back_populates="linen")