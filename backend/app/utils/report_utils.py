from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, Any, List
from datetime import datetime, timedelta
from models.laundry import LaundryOrder, OrderStatus
from models.linen import Linen, LinenStatus
from models.loss import LossReport, LossStatus
from .date_utils import format_duration

def generate_efficiency_report(
    db: Session,
    start_date: datetime,
    end_date: datetime,
    department_id: int = None
) -> Dict[str, Any]:
    """
    Generate detailed efficiency report.
    """
    query = db.query(LaundryOrder).filter(
        LaundryOrder.request_date.between(start_date, end_date),
        LaundryOrder.status == OrderStatus.COMPLETED
    )
    
    if department_id:
        query = query.filter(LaundryOrder.department_id == department_id)
    
    orders = query.all()
    
    processing_times = []
    for order in orders:
        if order.completion_date:
            duration = (order.completion_date - order.request_date).total_seconds()
            processing_times.append(duration)
    
    avg_time = sum(processing_times) / len(processing_times) if processing_times else 0
    
    return {
        'total_orders': len(orders),
        'average_processing_time': format_duration(avg_time),
        'min_processing_time': format_duration(min(processing_times)) if processing_times else "N/A",
        'max_processing_time': format_duration(max(processing_times)) if processing_times else "N/A",
        'orders_within_sla': sum(1 for t in processing_times if t <= 48 * 3600),  # 48 hours SLA
        'sla_compliance_rate': (sum(1 for t in processing_times if t <= 48 * 3600) / len(processing_times) * 100) if processing_times else 0
    }

def generate_loss_report(
    db: Session,
    start_date: datetime,
    end_date: datetime
) -> Dict[str, Any]:
    """
    Generate comprehensive loss report.
    """
    reports = db.query(LossReport).filter(
        LossReport.report_date.between(start_date, end_date)
    ).all()
    
    total_cost = sum(report.replacement_cost or 0 for report in reports)
    by_reason = {}
    by_department = {}
    
    for report in reports:
        # Aggregate by reason
        reason = report.reason.value
        by_reason[reason] = by_reason.get(reason, {
            'count': 0,
            'cost': 0
        })
        by_reason[reason]['count'] += report.quantity
        by_reason[reason]['cost'] += report.replacement_cost or 0
        
        # Aggregate by department
        dept = report.department.name
        by_department[dept] = by_department.get(dept, {
            'count': 0,
            'cost': 0
        })
        by_department[dept]['count'] += report.quantity
        by_department[dept]['cost'] += report.replacement_cost or 0
    
    return {
        'total_reports': len(reports),
        'total_items_lost': sum(report.quantity for report in reports),
        'total_cost': total_cost,
        'by_reason': by_reason,
        'by_department': by_department,
        'resolution_rate': (sum(1 for r in reports if r.status in [LossStatus.RESOLVED, LossStatus.REPLACED]) / len(reports) * 100) if reports else 0
    }

def generate_inventory_report(db: Session) -> Dict[str, Any]:
    """
    Generate detailed inventory report.
    """
    from ..models.department import Department
    
    departments = db.query(Department).all()
    inventory_stats = []
    
    for dept in departments:
        linens = db.query(Linen).filter(Linen.department_id == dept.id).all()
        total = len(linens)
        
        status_counts = {
            status.value: sum(1 for l in linens if l.status == status)
            for status in LinenStatus
        }
        
        inventory_stats.append({
            'department': dept.name,
            'total_items': total,
            'quota': dept.linen_quota,
            'utilization_rate': (total - status_counts['available']) / total if total > 0 else 0,
            'status_breakdown': status_counts,
            'quota_compliance': total <= dept.linen_quota,
            'stock_level': 'Low' if status_counts['available'] < (dept.linen_quota * dept.auto_reorder_threshold / 100) else 'Adequate'
        })
    
    return {
        'departments': inventory_stats,
        'total_items': sum(stat['total_items'] for stat in inventory_stats),
        'total_available': sum(stat['status_breakdown']['available'] for stat in inventory_stats),
        'departments_low_stock': sum(1 for stat in inventory_stats if stat['stock_level'] == 'Low')
    }