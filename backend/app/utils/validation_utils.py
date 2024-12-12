from typing import List, Dict, Any
from fastapi import HTTPException

def validate_date_range(start_date: str, end_date: str) -> None:
    """
    Validate date range parameters.
    """
    if start_date > end_date:
        raise HTTPException(
            status_code=400,
            detail="Start date must be before end date"
        )

def validate_department_access(user_departments: List[int], target_department: int) -> None:
    """
    Validate user has access to department.
    """
    if target_department not in user_departments:
        raise HTTPException(
            status_code=403,
            detail="Access denied for this department"
        )

def validate_report_parameters(params: Dict[str, Any]) -> None:
    """
    Validate report generation parameters.
    """
    required_fields = ['start_date', 'end_date', 'report_type']
    missing_fields = [field for field in required_fields if field not in params]
    
    if missing_fields:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required parameters: {', '.join(missing_fields)}"
        )