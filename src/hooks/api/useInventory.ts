import { useQuery } from 'react-query';
import * as api from '../../services/api';

export const useInventoryAlerts = () => {
  return useQuery('inventoryAlerts', api.getInventoryAlerts, {
    retry: 2,
    staleTime: 30000,
  });
};

export const useStockLevels = () => {
  return useQuery('stockLevels', api.getStockLevels, {
    retry: 2,
    staleTime: 60000,
  });
};

export const useInventoryMovement = (params?: {
  start_date?: string;
  end_date?: string;
  department_id?: number;
}) => {
  return useQuery(['inventoryMovement', params], () => api.getInventoryMovement(params), {
    retry: 2,
    staleTime: 60000,
  });
};