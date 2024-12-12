from sqlalchemy.orm import Session
from models.laundry import LaundryOrder, LaundryOrderItem
from schemas.laundry import LaundryOrderCreate, LaundryOrderUpdate
from typing import List, Optional
from datetime import datetime

def get_order(db: Session, order_id: int) -> Optional[LaundryOrder]:
    return db.query(LaundryOrder).filter(LaundryOrder.id == order_id).first()

def get_orders(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    department_id: Optional[int] = None,
    status: Optional[str] = None
) -> List[LaundryOrder]:
    query = db.query(LaundryOrder)
    if department_id:
        query = query.filter(LaundryOrder.department_id == department_id)
    if status:
        query = query.filter(LaundryOrder.status == status)
    return query.offset(skip).limit(limit).all()

def create_order(db: Session, order: LaundryOrderCreate) -> LaundryOrder:
    db_order = LaundryOrder(
        department_id=order.department_id,
        priority=order.priority
    )
    db.add(db_order)
    db.flush()  # Get the order ID before committing

    # Create order items
    for item in order.items:
        db_item = LaundryOrderItem(
            order_id=db_order.id,
            linen_id=item.linen_id,
            quantity=item.quantity
        )
        db.add(db_item)

    db.commit()
    db.refresh(db_order)
    return db_order

def update_order(db: Session, order_id: int, order: LaundryOrderUpdate) -> Optional[LaundryOrder]:
    db_order = get_order(db, order_id)
    if db_order:
        update_data = order.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_order, key, value)
        if order.status == "completed":
            db_order.completion_date = datetime.utcnow()
        db.commit()
        db.refresh(db_order)
    return db_order