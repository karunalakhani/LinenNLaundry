import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';

export const useLossReports = (params?: { department_id?: number; status?: string }) => {
  return useQuery(['lossReports', params], () => api.getLossReports(params), {
    retry: 2,
    staleTime: 30000,
    select: (data) => ({
      reports: data.reports,
      statistics: {
        totalLosses: data.statistics?.totalLosses || 0,
        totalCost: data.statistics?.totalCost || 0,
        byDepartment: data.statistics?.byDepartment || {},
        byReason: data.statistics?.byReason || {}
      }
    })
  });
};

export const useLossReportMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(api.createLossReport, {
    onSuccess: () => {
      queryClient.invalidateQueries('lossReports');
    },
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: string; data: any }) => api.updateLossReport(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('lossReports');
      },
    }
  );

  return { createMutation, updateMutation };
};