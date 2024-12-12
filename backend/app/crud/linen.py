from sqlalchemy.orm import Session
from models.linen import Linen
from schemas.linen import LinenCreate, LinenUpdate
from typing import List, Optional
from datetime import datetime

def get_linen(db: Session, linen_id: int) -> Optional[Linen]:
    return db.query(Linen).filter(Linen.id == linen_id).first()

def get_linen_by_serial(db: Session, serial_number: str) -> Optional[Linen]:
    return db.query(Linen).filter(Linen.serial_number == serial_number).first()

def get_linens(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    department_id: Optional[int] = None,
    status: Optional[str] = None
) -> List[Linen]:
    query = db.query(Linen)
    if department_id:
        query = query.filter(Linen.department_id == department_id)
    if status:
        query = query.filter(Linen.status == status)
    return query.offset(skip).limit(limit).all()

def create_linen(db: Session, linen: LinenCreate) -> Linen:
    db_linen = Linen(**linen.model_dump())
    db.add(db_linen)
    db.commit()
    db.refresh(db_linen)
    return db_linen

def update_linen(db: Session, linen_id: int, linen: LinenUpdate) -> Optional[Linen]:
    db_linen = get_linen(db, linen_id)
    if db_linen:
        update_data = linen.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_linen, key, value)
        db_linen.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_linen)
    return db_linen

def delete_linen(db: Session, linen_id: int) -> bool:
    db_linen = get_linen(db, linen_id)
    if db_linen:
        db.delete(db_linen)
        db.commit()
        return True
    return False