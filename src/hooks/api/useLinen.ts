import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';

export const useLinens = (params?: { department_id?: number; status?: string }) => {
  return useQuery(['linens', params], () => api.getLinens(params), {
    retry: 2,
    staleTime: 30000,
  });
};

export const useLinenMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(api.createLinen, {
    onSuccess: () => {
      queryClient.invalidateQueries('linens');
    },
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: string; data: any }) => api.updateLinen(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('linens');
      },
    }
  );

  const deleteMutation = useMutation(api.deleteLinen, {
    onSuccess: () => {
      queryClient.invalidateQueries('linens');
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};