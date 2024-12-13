def assign_staff_to_step(db: Session, process_id: int, step_id: int, staff_id: str) -> bool:
    step = db.query(ProcessStep).filter(
        ProcessStep.id == step_id,
        ProcessStep.process_id == process_id
    ).first()

    if not step:
        return False

    step.assigned_to = staff_id
    db.commit()
    return True

def get_bottleneck_steps(processes: list[LaundryProcess]) -> list[dict]:
    step_durations = {}

    for process in processes:
        for step in process.steps:
            if step.start_time and step.end_time:
                duration = (step.end_time - step.start_time).total_seconds()
                if step.name not in step_durations:
                    step_durations[step.name] = []
                step_durations[step.name].append(duration)

    bottlenecks = []
    for step_name, durations in step_durations.items():
        avg_duration = sum(durations) / len(durations)
        bottlenecks.append({"step_name": step_name, "average_duration": avg_duration})

    bottlenecks.sort(key=lambda x: x["average_duration"], reverse=True)
    return bottlenecks

