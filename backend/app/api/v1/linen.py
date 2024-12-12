from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from crud import linen as linen_crud
from schemas.linen import Linen, LinenCreate, LinenUpdate
from dependencies import get_db

router = APIRouter()

@router.get("/", response_model=List[Linen])
def read_linens(
    skip: int = 0,
    limit: int = 100,
    department_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve linens with optional filtering by department and status.
    """
    linens = linen_crud.get_linens(db, skip=skip, limit=limit, department_id=department_id, status=status)
    return linens

@router.post("/", response_model=Linen)
def create_linen(linen: LinenCreate, db: Session = Depends(get_db)):
    """
    Create a new linen item.
    """
    db_linen = linen_crud.get_linen_by_serial(db, serial_number=linen.serial_number)
    if db_linen:
        raise HTTPException(status_code=400, detail="Serial number already registered")
    return linen_crud.create_linen(db=db, linen=linen)

@router.get("/{linen_id}", response_model=Linen)
def read_linen(linen_id: int, db: Session = Depends(get_db)):
    """
    Get a specific linen by ID.
    """
    db_linen = linen_crud.get_linen(db, linen_id=linen_id)
    if db_linen is None:
        raise HTTPException(status_code=404, detail="Linen not found")
    return db_linen

@router.put("/{linen_id}", response_model=Linen)
def update_linen(linen_id: int, linen: LinenUpdate, db: Session = Depends(get_db)):
    """
    Update a linen item.
    """
    db_linen = linen_crud.update_linen(db, linen_id=linen_id, linen=linen)
    if db_linen is None:
        raise HTTPException(status_code=404, detail="Linen not found")
    return db_linen

@router.delete("/{linen_id}")
def delete_linen(linen_id: int, db: Session = Depends(get_db)):
    """
    Delete a linen item.
    """
    success = linen_crud.delete_linen(db, linen_id=linen_id)
    if not success:
        raise HTTPException(status_code=404, detail="Linen not found")
    return {"message": "Linen deleted successfully"}