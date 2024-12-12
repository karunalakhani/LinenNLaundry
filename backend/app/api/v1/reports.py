from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from dependencies import get_db
from models.laundry import LaundryOrder, OrderStatus
from models.linen import Linen, LinenStatus
from sqlalchemy import func

router = APIRouter()

@router.get("/usage")
def get_usage_report(
    start_date: datetime = Query(default=None),
    end_date: datetime = Query(default=None),
    department_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """
    Generate usage report for linens.
    """
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
    
    usage_stats = {
        "total_orders": len(orders),
        "items_processed": sum(sum(item.quantity for item in order.items) for order in orders),
        "by_department": {},
        "by_linen_type": {}
    }
    
    for order in orders:
        dept_name = order.department.name
        if dept_name not in usage_stats["by_department"]:
            usage_stats["by_department"][dept_name] = 0
        usage_stats["by_department"][dept_name] += sum(item.quantity for item in order.items)
        
        for item in order.items:
            linen_type = item.linen.type
            if linen_type not in usage_stats["by_linen_type"]:
                usage_stats["by_linen_type"][linen_type] = 0
            usage_stats["by_linen_type"][linen_type] += item.quantity
    
    return usage_stats

@router.get("/efficiency")
def get_efficiency_report(
    start_date: datetime = Query(default=None),
    end_date: datetime = Query(default=None),
    db: Session = Depends(get_db)
):
    """
    Generate efficiency report for laundry operations.
    """
    if not start_date:
        start_date = datetime.utcnow() - timedelta(days=30)
    if not end_date:
        end_date = datetime.utcnow()

    completed_orders = db.query(LaundryOrder).filter(
        LaundryOrder.status == OrderStatus.COMPLETED,
        LaundryOrder.request_date.between(start_date, end_date)
    ).all()

    efficiency_stats = {
        "total_orders": len(completed_orders),
        "average_processing_time": 0,
        "by_priority": {
            "high": {"count": 0, "avg_time": 0},
            "medium": {"count": 0, "avg_time": 0},
            "low": {"count": 0, "avg_time": 0}
        }
    }

    for order in completed_orders:
        if order.completion_date:
            processing_time = (order.completion_date - order.request_date).total_seconds() / 3600
            priority = order.priority.value
            
            efficiency_stats["by_priority"][priority]["count"] += 1
            efficiency_stats["by_priority"][priority]["avg_time"] += processing_time

    # Calculate averages
    total_time = sum(
        stats["avg_time"]
        for stats in efficiency_stats["by_priority"].values()
    )
    
    if completed_orders:
        efficiency_stats["average_processing_time"] = total_time / len(completed_orders)
        
        for priority in efficiency_stats["by_priority"]:
            if efficiency_stats["by_priority"][priority]["count"] > 0:
                efficiency_stats["by_priority"][priority]["avg_time"] /= efficiency_stats["by_priority"][priority]["count"]

    return efficiency_stats

@router.get("/inventory-status")
def get_inventory_status_report(db: Session = Depends(get_db)):
    """
    Generate inventory status report.
    """
    from ...models.department import Department
    
    departments = db.query(Department).all()
    status_report = []
    
    for dept in departments:
        total_linens = db.query(func.count(Linen.id)).filter(Linen.department_id == dept.id).scalar()
        status_counts = {
            status.value: db.query(func.count(Linen.id)).filter(
                Linen.department_id == dept.id,
                Linen.status == status
            ).scalar()
            for status in LinenStatus
        }
        
        status_report.append({
            "department": dept.name,
            "total_linens": total_linens,
            "quota": dept.linen_quota,
            "utilization_rate": (total_linens - status_counts["available"]) / total_linens if total_linens > 0 else 0,
            "status_breakdown": status_counts
        })
    
    return status_report