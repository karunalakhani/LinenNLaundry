from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from dependencies import get_db
from models.linen import Linen, LinenStatus
from sqlalchemy import func
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/alerts")
def get_inventory_alerts(db: Session = Depends(get_db)):
    """
    Get inventory alerts for low stock and damaged items.
    """
    from models.department import Department
    
    alerts = []
    departments = db.query(Department).all()
    
    for dept in departments:
        available_count = db.query(func.count(Linen.id)).filter(
            Linen.department_id == dept.id,
            Linen.status == LinenStatus.AVAILABLE
        ).scalar()
        
        if available_count <= (dept.linen_quota * dept.auto_reorder_threshold / 100):
            alerts.append({
                "type": "low_stock",
                "department": dept.name,
                "current_stock": available_count,
                "threshold": dept.auto_reorder_threshold,
                "quota": dept.linen_quota
            })
    
    damaged_items = db.query(Linen).filter(Linen.status == LinenStatus.DAMAGED).all()
    for item in damaged_items:
        alerts.append({
            "type": "damaged",
            "linen_id": item.id,
            "serial_number": item.serial_number,
            "department": item.department.name if item.department else None
        })
    
    return alerts

@router.get("/movement-history")
def get_inventory_movement(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    department_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """
    Get inventory movement history with optional filters.
    """
    from models.laundry import LaundryOrder, LaundryOrderItem
    
    if not start_date:
        start_date = datetime.utcnow() - timedelta(days=30)
    if not end_date:
        end_date = datetime.utcnow()
        
    query = db.query(LaundryOrder).filter(
        LaundryOrder.request_date.between(start_date, end_date)
    )
    
    if department_id:
        query = query.filter(LaundryOrder.department_id == department_id)
        
    orders = query.all()
    movements = []
    
    for order in orders:
        movements.append({
            "date": order.request_date,
            "type": "laundry_order",
            "department": order.department.name,
            "items": [
                {
                    "linen_type": item.linen.type,
                    "quantity": item.quantity
                }
                for item in order.items
            ]
        })
    
    return movements

@router.get("/stock-levels")
def get_stock_levels(db: Session = Depends(get_db)):
    """
    Get current stock levels by linen type and department.
    """
    from models.department import Department
    
    departments = db.query(Department).all()
    stock_levels = []
    
    for dept in departments:
        linen_types = db.query(Linen.type, func.count(Linen.id)).filter(
            Linen.department_id == dept.id
        ).group_by(Linen.type).all()
        
        stock_levels.append({
            "department": dept.name,
            "stock": [
                {
                    "type": linen_type,
                    "count": count,
                    "available": db.query(func.count(Linen.id)).filter(
                        Linen.department_id == dept.id,
                        Linen.type == linen_type,
                        Linen.status == LinenStatus.AVAILABLE
                    ).scalar()
                }
                for linen_type, count in linen_types
            ]
        })
    
    return stock_levels
