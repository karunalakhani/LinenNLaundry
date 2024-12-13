from datetime import datetime
from sqlalchemy.orm import Session
from typing import List, Optional
from models import LaundryProcess, ProcessStep
from schemas import LaundryProcessCreate, ProcessStepCreate, ProcessStatus

def get_process(db: Session, process_id: int) -> Optional[LaundryProcess]:
    return db.query(LaundryProcess).filter(LaundryProcess.id == process_id).first()

def get_processes(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    status: Optional[ProcessStatus] = None
) -> List[LaundryProcess]:
    query = db.query(LaundryProcess)
    if status:
        query = query.filter(LaundryProcess.current_step == status.value)
    return query.offset(skip).limit(limit).all()

def create_process(db: Session, process: LaundryProcessCreate) -> LaundryProcess:
    db_process = LaundryProcess(
        order_id=process.order_id,
        current_step=process.current_step,
        assigned_to=process.assigned_to,
        notes=process.notes,
        start_time=datetime.utcnow(),
        estimated_completion=datetime.utcnow() + timedelta(days=3),  # Example estimation logic
    )
    db.add(db_process)
    db.commit()
    db.refresh(db_process)

    for step_data in process.steps:
        step = ProcessStep(
            process_id=db_process.id,
            name=step_data.name,
            assigned_to=step_data.assigned_to,
            notes=step_data.notes,
            status=ProcessStatus.PENDING,
        )
        db.add(step)
    db.commit()
    return db_process

def update_process(db: Session, process_id: int, updates: dict) -> Optional[LaundryProcess]:
    db_process = get_process(db, process_id)
    if db_process:
        for key, value in updates.items():
            setattr(db_process, key, value)
        db.commit()
        db.refresh(db_process)
    return db_process

def delete_process(db: Session, process_id: int) -> bool:
    db_process = get_process(db, process_id)
    if db_process:
        db.delete(db_process)
        db.commit()
        return True
    return False

def add_step_to_process(db: Session, process_id: int, step_data: ProcessStepCreate) -> ProcessStep:
    step = ProcessStep(
        process_id=process_id,
        name=step_data.name,
        assigned_to=step_data.assigned_to,
        notes=step_data.notes,
        status=ProcessStatus.PENDING,
    )
    db.add(step)
    db.commit()
    db.refresh(step)
    return step

def update_step(db: Session, step_id: int, updates: dict) -> Optional[ProcessStep]:
    step = db.query(ProcessStep).filter(ProcessStep.id == step_id).first()
    if step:
        for key, value in updates.items():
            setattr(step, key, value)
        db.commit()
        db.refresh(step)
    return step

def delete_step(db: Session, step_id: int) -> bool:
    step = db.query(ProcessStep).filter(ProcessStep.id == step_id).first()
    if step:
        db.delete(step)
        db.commit()
        return True
    return False
