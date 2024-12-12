from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from crud import settings as settings_crud
from schemas.settings import NotificationSetting, NotificationSettingCreate, Setting, SettingUpdate
from dependencies import get_db

router = APIRouter()

@router.get("/notifications", response_model=List[NotificationSetting])
def get_notification_settings(db: Session = Depends(get_db)):
    """
    Retrieve all notification settings.
    """
    return settings_crud.get_notification_settings(db)

@router.post("/notifications", response_model=NotificationSetting)
def create_notification_setting(
    setting: NotificationSettingCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new notification setting.
    """
    return settings_crud.create_notification_setting(db=db, setting=setting)

@router.put("/notifications/{setting_id}", response_model=NotificationSetting)
def update_notification_setting(
    setting_id: int,
    setting: NotificationSettingCreate,
    db: Session = Depends(get_db)
):
    """
    Update a notification setting.
    """
    updated = settings_crud.update_notification_setting(
        db, setting_id=setting_id, setting=setting
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Setting not found")
    return updated

@router.get("/system", response_model=List[Setting])
def get_system_settings(db: Session = Depends(get_db)):
    """
    Retrieve all system settings.
    """
    return settings_crud.get_system_settings(db)

@router.put("/system/{key}", response_model=Setting)
def update_system_setting(
    key: str,
    setting: SettingUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a system setting by key.
    """
    updated = settings_crud.update_system_setting(db, key=key, value=setting.value)
    if not updated:
        raise HTTPException(status_code=404, detail="Setting not found")
    return updated