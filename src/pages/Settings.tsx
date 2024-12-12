import React from 'react';
import { DepartmentSettings } from '../components/settings/DepartmentSettings';
import { LinenTypeSettings } from '../components/settings/LinenTypeSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { useNotificationSettings, useSystemSettings, useSettingsMutations } from '../hooks/useApi';

export const Settings: React.FC = () => {
  const { data: notificationSettings, isLoading: notificationsLoading } = useNotificationSettings();
  const { data: systemSettings, isLoading: systemLoading } = useSystemSettings();
  const { updateNotificationMutation, updateSystemMutation } = useSettingsMutations();

  const handleNotificationUpdate = (settings: any) => {
    updateNotificationMutation.mutate(settings);
  };

  const handleSystemUpdate = (key: string, value: any) => {
    updateSystemMutation.mutate({ key, value });
  };

  if (notificationsLoading || systemLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <DepartmentSettings
          departments={systemSettings?.departments || []}
          onUpdate={(departments) => handleSystemUpdate('departments', departments)}
        />
        
        <LinenTypeSettings
          linenTypes={systemSettings?.linenTypes || []}
          onUpdate={(linenTypes) => handleSystemUpdate('linenTypes', linenTypes)}
        />
        
        <NotificationSettings
          settings={notificationSettings || []}
          onUpdate={handleNotificationUpdate}
        />
      </div>
    </div>
  );
};