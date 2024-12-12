from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any
from models.linen import Linen, LinenStatus
from models.laundry import LaundryOrder, OrderStatus
from datetime import datetime

def get_linen_stats(db: Session, department_id: int = None) -> Dict[str, int]:
    """
    Get linen statistics with optional department filter.
    """
    query = db.query(Linen)
    if department_id:
        query = query.filter(Linen.department_id == department_id)
    
    stats = {status.value: 0 for status in LinenStatus}
    for status in LinenStatus:
        stats[status.value] = query.filter(Linen.status == status).count()
    
    stats['total'] = sum(stats.values())
    return stats

def get_order_metrics(
    db: Session,
    start_date: datetime,
    end_date: datetime,
    department_id: int = None
) -> Dict[str, Any]:
    """
    Get order processing metrics for a given time period.
    """
    query = db.query(LaundryOrder).filter(
        LaundryOrder.request_date.between(start_date, end_date)
    )
    
    if department_id:
        query = query.filter(LaundryOrder.department_id == department_id)
    
    total_orders = query.count()
    completed_orders = query.filter(LaundryOrder.status == OrderStatus.COMPLETED).count()
    
    return {
        'total_orders': total_orders,
        'completed_orders': completed_orders,
        'completion_rate': (completed_orders / total_orders * 100) if total_orders > 0 else 0
    }