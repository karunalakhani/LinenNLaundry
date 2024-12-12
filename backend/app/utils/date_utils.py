from datetime import datetime, timedelta
from typing import Tuple

def get_date_range(period: str) -> Tuple[datetime, datetime]:
    """
    Get start and end dates based on period.
    
    Args:
        period: One of 'today', 'week', 'month', 'quarter', 'year'
    """
    end_date = datetime.utcnow()
    
    if period == 'today':
        start_date = end_date.replace(hour=0, minute=0, second=0, microsecond=0)
    elif period == 'week':
        start_date = end_date - timedelta(days=end_date.weekday())
    elif period == 'month':
        start_date = end_date.replace(day=1)
    elif period == 'quarter':
        quarter_start_month = ((end_date.month - 1) // 3) * 3 + 1
        start_date = end_date.replace(month=quarter_start_month, day=1)
    elif period == 'year':
        start_date = end_date.replace(month=1, day=1)
    else:
        raise ValueError(f"Invalid period: {period}")
    
    return start_date, end_date

def format_duration(seconds: float) -> str:
    """
    Format duration in seconds to human-readable string.
    """
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    
    if hours > 0:
        return f"{hours}h {minutes}m"
    return f"{minutes}m"