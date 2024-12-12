from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from enum import Enum

class OrderStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DELIVERED = "delivered"

class OrderPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class LaundryOrderItemBase(BaseModel):
    linen_id: int
    quantity: int = 1

class LaundryOrderItemCreate(LaundryOrderItemBase):
    pass

class LaundryOrderItem(LaundryOrderItemBase):
    id: int
    order_id: int

    class Config:
        from_attributes = True

class LaundryOrderBase(BaseModel):
    department_id: int
    priority: OrderPriority = OrderPriority.MEDIUM

class LaundryOrderCreate(LaundryOrderBase):
    items: List[LaundryOrderItemCreate]

class LaundryOrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    priority: Optional[OrderPriority] = None

class LaundryOrder(LaundryOrderBase):
    id: int
    status: OrderStatus
    request_date: datetime
    completion_date: Optional[datetime]
    items: List[LaundryOrderItem]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True