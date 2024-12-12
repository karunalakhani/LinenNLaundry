from sqlalchemy import Column, Integer, String, Boolean, JSON, Enum
from database import Base
import enum

class NotificationType(str, enum.Enum):
    STOCK = "stock"
    MAINTENANCE = "maintenance"
    DELIVERY = "delivery"
    QUALITY = "quality"

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)
    value = Column(JSON)

class NotificationSetting(Base):
    __tablename__ = "notification_settings"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(NotificationType))
    enabled = Column(Boolean, default=True)
    threshold = Column(Integer, nullable=True)
    recipients = Column(JSON)  # Store email addresses as JSON array