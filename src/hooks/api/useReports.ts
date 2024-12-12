import { useQuery } from 'react-query';
import * as api from '../../services/api';

export const useEfficiencyReport = (params?: {
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery(['efficiencyReport', params], () => api.getEfficiencyReport(params), {
    retry: 2,
    staleTime: 300000, // 5 minutes
  });
};

export const useInventoryStatus = () => {
  return useQuery('inventoryStatus', api.getInventoryStatus, {
    retry: 2,
    staleTime: 300000,
  });
};

export const useUsageReport = (params?: {
  start_date?: string;
  end_date?: string;
  department_id?: number;
}) => {
  return useQuery(['usageReport', params], () => api.getUsageReport(params), {
    retry: 2,
    staleTime: 300000,
  });
};