import { useQuery } from 'react-query';
import * as api from '../../services/api';

export const useDashboardStats = () => {
  return useQuery('dashboardStats', api.getDashboardStats, {
    retry: 2,
    staleTime: 30000, // 30 seconds
  });
};

export const useActivityFeed = (limit?: number) => {
  return useQuery(['activityFeed', limit], () => api.getActivityFeed(limit), {
    retry: 2,
    staleTime: 30000,
  });
};

export const useDepartmentPerformance = (params?: { start_date?: string; end_date?: string }) => {
  return useQuery(['departmentPerformance', params], () => api.getDepartmentPerformance(params), {
    retry: 2,
    staleTime: 60000, // 1 minute
  });
};