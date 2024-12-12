from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from crud import department as department_crud
from schemas.department import Department, DepartmentCreate, DepartmentUpdate
from dependencies import get_db

router = APIRouter()

@router.get("/", response_model=List[Department])
def read_departments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all departments.
    """
    departments = department_crud.get_departments(db, skip=skip, limit=limit)
    return departments

@router.post("/", response_model=Department)
def create_department(department: DepartmentCreate, db: Session = Depends(get_db)):
    """
    Create a new department.
    """
    db_department = department_crud.get_department_by_name(db, name=department.name)
    if db_department:
        raise HTTPException(status_code=400, detail="Department already exists")
    return department_crud.create_department(db=db, department=department)

@router.get("/{department_id}", response_model=Department)
def read_department(department_id: int, db: Session = Depends(get_db)):
    """
    Get a specific department by ID.
    """
    db_department = department_crud.get_department(db, department_id=department_id)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    return db_department

@router.put("/{department_id}", response_model=Department)
def update_department(department_id: int, department: DepartmentUpdate, db: Session = Depends(get_db)):
    """
    Update a department.
    """
    db_department = department_crud.update_department(db, department_id=department_id, department=department)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    return db_department

@router.delete("/{department_id}")
def delete_department(department_id: int, db: Session = Depends(get_db)):
    """
    Delete a department.
    """
    success = department_crud.delete_department(db, department_id=department_id)
    if not success:
        raise HTTPException(status_code=404, detail="Department not found")
    return {"message": "Department deleted successfully"}