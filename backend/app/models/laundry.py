from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import enum

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DELIVERED = "delivered"

class OrderPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class LaundryOrder(Base):
    __tablename__ = "laundry_orders"

    id = Column(Integer, primary_key=True, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    priority = Column(Enum(OrderPriority), default=OrderPriority.MEDIUM)
    request_date = Column(DateTime, default=datetime.utcnow)
    completion_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    department = relationship("Department", back_populates="laundry_orders")
    items = relationship("LaundryOrderItem", back_populates="order")

class LaundryOrderItem(Base):
    __tablename__ = "laundry_order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("laundry_orders.id"))
    linen_id = Column(Integer, ForeignKey("linens.id"))
    quantity = Column(Integer, default=1)

    order = relationship("LaundryOrder", back_populates="items")
    linen = relationship("Linen", back_populates="laundry_orders")