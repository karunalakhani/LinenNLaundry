from app.database import SessionLocal, engine, Base
from app.models.department import Department, DepartmentPriority
from app.models.linen import Linen, LinenStatus, LinenCondition
from app.models.laundry import LaundryOrder, LaundryOrderItem, OrderStatus, OrderPriority
from app.models.process import LaundryProcess, ProcessStep, ProcessStatus
from app.models.loss import LossReport, LossReason, LossStatus
from app.models.settings import Settings, NotificationSetting, NotificationType
from datetime import datetime, timedelta
import random

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear existing data
for table in reversed(Base.metadata.sorted_tables):
    db.execute(table.delete())
db.commit()

# Seed Departments
departments = [
    {
        "name": "Emergency",
        "linen_quota": 200,
        "priority": DepartmentPriority.HIGH,
        "auto_reorder_threshold": 30
    },
    {
        "name": "Surgery",
        "linen_quota": 300,
        "priority": DepartmentPriority.HIGH,
        "auto_reorder_threshold": 25
    },
    {
        "name": "ICU",
        "linen_quota": 150,
        "priority": DepartmentPriority.HIGH,
        "auto_reorder_threshold": 30
    },
    {
        "name": "General Ward",
        "linen_quota": 400,
        "priority": DepartmentPriority.MEDIUM,
        "auto_reorder_threshold": 20
    }
]

dept_objects = []
for dept_data in departments:
    dept = Department(**dept_data)
    db.add(dept)
    dept_objects.append(dept)

db.commit()

# Seed Linens
linen_types = ["Bedsheet", "Pillowcase", "Blanket", "Surgical Drape", "Patient Gown"]
conditions = [LinenCondition.NEW, LinenCondition.GOOD, LinenCondition.FAIR, LinenCondition.POOR]
statuses = [LinenStatus.AVAILABLE, LinenStatus.IN_USE, LinenStatus.IN_LAUNDRY, LinenStatus.DAMAGED]

linen_objects = []
for i in range(100):
    linen = Linen(
        serial_number=f"LIN{i+1:04d}",
        type=random.choice(linen_types),
        status=random.choice(statuses),
        condition=random.choice(conditions),
        department_id=random.choice(dept_objects).id,
        last_used=datetime.utcnow() - timedelta(days=random.randint(0, 30))
    )
    db.add(linen)
    linen_objects.append(linen)

db.commit()

# Seed Laundry Orders
for i in range(20):
    days_ago = random.randint(0, 30)
    status = random.choice(list(OrderStatus))
    order = LaundryOrder(
        department_id=random.choice(dept_objects).id,
        status=status,
        priority=random.choice(list(OrderPriority)),
        request_date=datetime.utcnow() - timedelta(days=days_ago),
        completion_date=datetime.utcnow() - timedelta(days=days_ago-1) if status == OrderStatus.COMPLETED else None
    )
    db.add(order)
    db.flush()
    
    # Add items to order
    for _ in range(random.randint(2, 5)):
        item = LaundryOrderItem(
            order_id=order.id,
            linen_id=random.choice(linen_objects).id,
            quantity=random.randint(1, 5)
        )
        db.add(item)

db.commit()

# Seed Laundry Processes
process_steps = ["Sorting", "Pre-treatment", "Washing", "Drying", "Quality Check"]
for order in db.query(LaundryOrder).all():
    process = LaundryProcess(
        order_id=order.id,
        current_step=random.choice(process_steps),
        start_time=order.request_date,
        estimated_completion=order.request_date + timedelta(hours=random.randint(4, 12)),
        assigned_to=f"Staff{random.randint(1, 5)}"
    )
    db.add(process)
    db.flush()
    
    # Add steps
    for step_name in process_steps:
        step = ProcessStep(
            process_id=process.id,
            name=step_name,
            status=random.choice(list(ProcessStatus)),
            start_time=process.start_time + timedelta(hours=random.randint(0, 4)),
            assigned_to=f"Staff{random.randint(1, 5)}"
        )
        if step.status == ProcessStatus.COMPLETED:
            step.end_time = step.start_time + timedelta(hours=random.randint(1, 3))
        db.add(step)

db.commit()

# Seed Loss Reports
for i in range(15):
    days_ago = random.randint(0, 30)
    status = random.choice(list(LossStatus))
    report = LossReport(
        linen_id=random.choice(linen_objects).id,
        department_id=random.choice(dept_objects).id,
        quantity=random.randint(1, 3),
        reason=random.choice(list(LossReason)),
        status=status,
        description=f"Loss report #{i+1} description",
        reported_by=f"Staff{random.randint(1, 5)}",
        report_date=datetime.utcnow() - timedelta(days=days_ago),
        replacement_cost=random.randint(20, 100),
        resolved_date=datetime.utcnow() - timedelta(days=days_ago-2) if status in [LossStatus.RESOLVED, LossStatus.REPLACED] else None
    )
    db.add(report)

db.commit()

# Seed Settings
notification_settings = [
    {
        "type": NotificationType.STOCK,
        "enabled": True,
        "threshold": 20,
        "recipients": ["inventory@hospital.com"]
    },
    {
        "type": NotificationType.MAINTENANCE,
        "enabled": True,
        "recipients": ["maintenance@hospital.com"]
    },
    {
        "type": NotificationType.DELIVERY,
        "enabled": True,
        "recipients": ["logistics@hospital.com"]
    },
    {
        "type": NotificationType.QUALITY,
        "enabled": True,
        "threshold": 90,
        "recipients": ["quality@hospital.com"]
    }
]

for setting in notification_settings:
    notification = NotificationSetting(**setting)
    db.add(notification)

# System settings
system_settings = [
    {
        "key": "default_processing_time",
        "value": {"hours": 24}
    },
    {
        "key": "quality_threshold",
        "value": {"percentage": 95}
    },
    {
        "key": "auto_assign_orders",
        "value": {"enabled": True}
    }
]

for setting in system_settings:
    system_setting = Settings(**setting)
    db.add(system_setting)

db.commit()
db.close()

print("Database seeded successfully!")