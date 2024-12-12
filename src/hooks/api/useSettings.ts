import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';

export const useNotificationSettings = () => {
  return useQuery('notificationSettings', api.getNotificationSettings, {
    retry: 2,
    staleTime: 300000,
  });
};

export const useSystemSettings = () => {
  return useQuery('systemSettings', api.getSystemSettings, {
    retry: 2,
    staleTime: 300000,
  });
};

export const useSettingsMutations = () => {
  const queryClient = useQueryClient();

  const updateNotificationMutation = useMutation(
    ({ id, data }: { id: string; data: any }) => api.updateNotificationSetting(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notificationSettings');
      },
    }
  );

  const updateSystemMutation = useMutation(
    ({ key, value }: { key: string; value: any }) => api.updateSystemSetting(key, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('systemSettings');
      },
    }
  );

  return { updateNotificationMutation, updateSystemMutation };
};