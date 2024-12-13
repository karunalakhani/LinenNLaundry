from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from .models import LaundryOrder, LossReport, Department, OrderStatus
from .database import get_db

router = APIRouter()

@router.get("/activity-feed")
def get_activity_feed(
    limit: int = 10,
    department_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """
    Get recent activity feed for the dashboard.
    """
    activities = []

    # Get recent laundry orders
    orders_query = db.query(LaundryOrder).order_by(LaundryOrder.request_date.desc()).limit(limit)
    if department_id:
        orders_query = orders_query.filter(LaundryOrder.department_id == department_id)
    
    orders = orders_query.all()
    for order in orders:
        activities.append({
            "type": "laundry_order",
            "timestamp": order.request_date,
            "department": order.department.name,
            "description": f"New laundry order from {order.department.name}",
            "priority": order.priority.value
        })

    # Get recent loss reports
    reports_query = db.query(LossReport).order_by(LossReport.report_date.desc()).limit(limit)
    if department_id:
        reports_query = reports_query.filter(LossReport.department_id == department_id)

    reports = reports_query.all()
    for report in reports:
        activities.append({
            "type": "loss_report",
            "timestamp": report.report_date,
            "department": report.department.name,
            "description": f"Loss report: {report.quantity} {report.linen.type}",
            "reason": report.reason.value
        })

    # Sort combined activities by timestamp
    activities.sort(key=lambda x: x["timestamp"], reverse=True)
    return activities[:limit]

@router.get("/department-performance")
def get_department_performance(
    start_date: datetime = Query(default=None),
    end_date: datetime = Query(default=None),
    db: Session = Depends(get_db)
):
    """
    Get department performance metrics.
    """
    if not start_date:
        start_date = datetime.utcnow() - timedelta(days=30)
    if not end_date:
        end_date = datetime.utcnow()

    departments = db.query(Department).all()
    performance = []

    for dept in departments:
        orders = db.query(LaundryOrder).filter(
            LaundryOrder.department_id == dept.id,
            LaundryOrder.request_date.between(start_date, end_date)
        ).all()

        completed_orders = [o for o in orders if o.status == OrderStatus.COMPLETED]
        avg_processing_time = 0
        if completed_orders:
            processing_times = [
                (o.completion_date - o.request_date).total_seconds() / 3600
                for o in completed_orders if o.completion_date
            ]
            avg_processing_time = sum(processing_times) / len(processing_times) if processing_times else 0

        performance.append({
            "department": dept.name,
            "total_orders": len(orders),
            "completed_orders": len(completed_orders),
            "average_processing_time": avg_processing_time,
            "compliance_rate": len(completed_orders) / len(orders) * 100 if orders else 0
        })

    return performance
