import React from 'react';
import { Bell } from 'lucide-react';
import type { NotificationSetting } from '../../types/settings';
import { useNotificationSettings, useSettingsMutations } from '../../hooks/useApi';

interface NotificationSettingsProps {
  settings: NotificationSetting[];
  onUpdate: (settings: NotificationSetting[]) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onUpdate
}) => {
  const { data: notificationSettings, isLoading } = useNotificationSettings();
  const { updateNotificationMutation } = useSettingsMutations();

  const handleToggle = (type: NotificationSetting['type']) => {
    const setting = settings.find(s => s.type === type);
    if (setting) {
      updateNotificationMutation.mutate({
        id: setting.id,
        data: { ...setting, enabled: !setting.enabled }
      });
    }
  };

  const handleThresholdChange = (type: NotificationSetting['type'], value: number) => {
    const setting = settings.find(s => s.type === type);
    if (setting) {
      updateNotificationMutation.mutate({
        id: setting.id,
        data: { ...setting, threshold: value }
      });
    }
  };

  const handleRecipientsChange = (type: NotificationSetting['type'], value: string) => {
    const setting = settings.find(s => s.type === type);
    if (setting) {
      updateNotificationMutation.mutate({
        id: setting.id,
        data: { ...setting, recipients: value.split(',').map(r => r.trim()) }
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Bell className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold">Notification Settings</h2>
      </div>

      <div className="space-y-6">
        {settings.map(setting => (
          <div key={setting.type} className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.type)}
                  className="h-4 w-4 text-axonic-primary focus:ring-axonic-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {setting.type.charAt(0).toUpperCase() + setting.type.slice(1)} Notifications
                </span>
              </div>
            </div>

            {setting.enabled && (
              <div className="space-y-4">
                {setting.threshold !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Alert Threshold
                    </label>
                    <input
                      type="number"
                      value={setting.threshold}
                      onChange={(e) => handleThresholdChange(setting.type, parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-axonic-primary focus:ring-axonic-primary"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Recipients (comma-separated emails)
                  </label>
                  <input
                    type="text"
                    value={setting.recipients.join(', ')}
                    onChange={(e) => handleRecipientsChange(setting.type, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-axonic-primary focus:ring-axonic-primary"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};