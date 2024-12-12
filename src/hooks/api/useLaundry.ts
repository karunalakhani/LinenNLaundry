import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';

export const useLaundryOrders = (params?: { 
  department_id?: number; 
  status?: string;
  skip?: number;
  limit?: number;
}) => {
  return useQuery(['laundryOrders', params], () => api.getLaundryOrders(params), {
    retry: 2,
    staleTime: 30000,
  });
};

export const useLaundryOrderMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(api.createLaundryOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('laundryOrders');
    },
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: string; data: any }) => api.updateLaundryOrder(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('laundryOrders');
      },
    }
  );

  return { createMutation, updateMutation };
};

export const useProcesses = () => {
  return useQuery('processes', api.getProcesses, {
    retry: 2,
    staleTime: 30000,
  });
};

export const useProcessMutations = () => {
  const queryClient = useQueryClient();

  const updateStepMutation = useMutation(
    ({ processId, stepId, data }: { processId: string; stepId: string; data: any }) =>
      api.updateProcessStep(processId, stepId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('processes');
      },
    }
  );

  const assignStaffMutation = useMutation(
    ({ processId, stepId, staffId }: { processId: string; stepId: string; staffId: string }) =>
      api.assignStaffToStep(processId, stepId, staffId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('processes');
      },
    }
  );

  return { updateStepMutation, assignStaffMutation };
};