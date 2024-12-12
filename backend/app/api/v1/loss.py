from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from crud import loss as loss_crud
from schemas.loss import LossReport, LossReportCreate, LossReportUpdate
from dependencies import get_db

router = APIRouter()

@router.get("/", response_model=List[LossReport])
def get_loss_reports(
    skip: int = 0,
    limit: int = 100,
    department_id: int = None,
    status: str = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve loss reports with optional filtering.
    """
    return loss_crud.get_loss_reports(
        db, 
        skip=skip, 
        limit=limit, 
        department_id=department_id,
        status=status
    )

@router.post("/", response_model=LossReport)
def create_loss_report(report: LossReportCreate, db: Session = Depends(get_db)):
    """
    Create a new loss report.
    """
    return loss_crud.create_loss_report(db=db, report=report)

@router.get("/{report_id}", response_model=LossReport)
def get_loss_report(report_id: int, db: Session = Depends(get_db)):
    """
    Get a specific loss report by ID.
    """
    report = loss_crud.get_loss_report(db, report_id=report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Loss report not found")
    return report

@router.put("/{report_id}", response_model=LossReport)
def update_loss_report(
    report_id: int,
    report_update: LossReportUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a loss report status and resolution details.
    """
    report = loss_crud.update_loss_report(db, report_id=report_id, report=report_update)
    if not report:
        raise HTTPException(status_code=404, detail="Loss report not found")
    return report