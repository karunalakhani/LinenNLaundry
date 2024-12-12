from pydantic import BaseModel
from typing import List, Optional, Any
from enum import Enum

class NotificationType(str, Enum):
    STOCK = "stock"
    MAINTENANCE = "maintenance"
    DELIVERY = "delivery"
    QUALITY = "quality"

class NotificationSettingBase(BaseModel):
    type: NotificationType
    enabled: bool = True
    threshold: Optional[int] = None
    recipients: List[str]

class NotificationSettingCreate(NotificationSettingBase):
    pass

class NotificationSetting(NotificationSettingBase):
    id: int

    class Config:
        from_attributes = True

class SettingUpdate(BaseModel):
    value: Any

class Setting(BaseModel):
    key: str
    value: Any

    class Config:
        from_attributes = True