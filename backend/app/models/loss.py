from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import enum

class LossReason(str, enum.Enum):
    LOST = "lost"
    DAMAGED = "damaged"
    STOLEN = "stolen"
    WEAR_AND_TEAR = "wear_and_tear"

class LossStatus(str, enum.Enum):
    PENDING = "pending"
    INVESTIGATING = "investigating"
    RESOLVED = "resolved"
    REPLACED = "replaced"

class LossReport(Base):
    __tablename__ = "loss_reports"

    id = Column(Integer, primary_key=True, index=True)
    linen_id = Column(Integer, ForeignKey("linens.id"))
    department_id = Column(Integer, ForeignKey("departments.id"))
    quantity = Column(Integer, default=1)
    reason = Column(Enum(LossReason))
    status = Column(Enum(LossStatus), default=LossStatus.PENDING)
    description = Column(Text)
    reported_by = Column(String)
    report_date = Column(DateTime, default=datetime.utcnow)
    resolution_notes = Column(Text, nullable=True)
    replacement_cost = Column(Float, nullable=True)
    resolved_date = Column(DateTime, nullable=True)

    linen = relationship("Linen")
    department = relationship("Department")