# Add to existing process.py

@router.post("/{process_id}/steps/{step_id}/assign")
def assign_staff(
    process_id: int,
    step_id: int,
    staff_id: str,
    db: Session = Depends(get_db)
):
    """
    Assign staff to a process step.
    """
    success = process_crud.assign_staff_to_step(
        db,
        process_id=process_id,
        step_id=step_id,
        staff_id=staff_id
    )
    if not success:
        raise HTTPException(status_code=404, detail="Process or step not found")
    return {"message": "Staff assigned successfully"}

@router.get("/statistics")
def get_process_statistics(
    start_date: datetime = Query(default=None),
    end_date: datetime = Query(default=None),
    db: Session = Depends(get_db)
):
    """
    Get process statistics and metrics.
    """
    if not start_date:
        start_date = datetime.utcnow() - timedelta(days=30)
    if not end_date:
        end_date = datetime.utcnow()
        
    processes = db.query(LaundryProcess).filter(
        LaundryProcess.start_time.between(start_date, end_date)
    ).all()
    
    completed = [p for p in processes if all(s.status == ProcessStatus.COMPLETED for s in p.steps)]
    
    return {
        "total_processes": len(processes),
        "completed_processes": len(completed),
        "completion_rate": len(completed) / len(processes) * 100 if processes else 0,
        "average_steps": sum(len(p.steps) for p in processes) / len(processes) if processes else 0,
        "bottleneck_steps": get_bottleneck_steps(processes)
    }