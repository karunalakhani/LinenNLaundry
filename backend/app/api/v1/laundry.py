from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from crud import laundry as laundry_crud
from schemas.laundry import LaundryOrder, LaundryOrderCreate, LaundryOrderUpdate
from dependencies import get_db

router = APIRouter()

@router.get("/", response_model=List[LaundryOrder])
def read_orders(
    skip: int = 0,
    limit: int = 100,
    department_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve laundry orders with optional filtering.
    """
    orders = laundry_crud.get_orders(
        db, 
        skip=skip, 
        limit=limit, 
        department_id=department_id,
        status=status
    )
    return orders

@router.post("/", response_model=LaundryOrder)
def create_order(order: LaundryOrderCreate, db: Session = Depends(get_db)):
    """
    Create a new laundry order.
    """
    return laundry_crud.create_order(db=db, order=order)

@router.get("/{order_id}", response_model=LaundryOrder)
def read_order(order_id: int, db: Session = Depends(get_db)):
    """
    Get a specific laundry order by ID.
    """
    db_order = laundry_crud.get_order(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.put("/{order_id}", response_model=LaundryOrder)
def update_order(order_id: int, order: LaundryOrderUpdate, db: Session = Depends(get_db)):
    """
    Update a laundry order.
    """
    db_order = laundry_crud.update_order(db, order_id=order_id, order=order)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order