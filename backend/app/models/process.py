from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import enum

class ProcessStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class ProcessStep(Base):
    __tablename__ = "process_steps"

    id = Column(Integer, primary_key=True, index=True)
    process_id = Column(Integer, ForeignKey("laundry_processes.id"))
    name = Column(String)
    status = Column(Enum(ProcessStatus), default=ProcessStatus.PENDING)
    start_time = Column(DateTime, nullable=True)
    end_time = Column(DateTime, nullable=True)
    assigned_to = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

    process = relationship("LaundryProcess", back_populates="steps")

class LaundryProcess(Base):
    __tablename__ = "laundry_processes"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("laundry_orders.id"))
    current_step = Column(String)
    start_time = Column(DateTime, default=datetime.utcnow)
    estimated_completion = Column(DateTime)
    assigned_to = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

    order = relationship("LaundryOrder")
    steps = relationship("ProcessStep", back_populates="process")