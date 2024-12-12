import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Linen Management
export const getLinens = async (params?: { 
  department_id?: number;
  status?: string;
  skip?: number;
  limit?: number;
}) => {
  const response = await api.get('/linens', { params });
  return response.data;
};

export const createLinen = async (data: any) => {
  const response = await api.post('/linens', data);
  return response.data;
};

export const updateLinen = async (id: string, data: any) => {
  const response = await api.put(`/linens/${id}`, data);
  return response.data;
};

export const deleteLinen = async (id: string) => {
  const response = await api.delete(`/linens/${id}`);
  return response.data;
};

// Laundry Orders
export const getLaundryOrders = async (params?: {
  department_id?: number;
  status?: string;
  skip?: number;
  limit?: number;
}) => {
  const response = await api.get('/laundry', { params });
  return response.data;
};

export const createLaundryOrder = async (data: any) => {
  const response = await api.post('/laundry', data);
  return response.data;
};

export const updateLaundryOrder = async (id: string, data: any) => {
  const response = await api.put(`/laundry/${id}`, data);
  return response.data;
};

// Process Management
export const getProcesses = async () => {
  const response = await api.get('/process');
  return response.data;
};

export const updateProcessStep = async (processId: string, stepId: string, data: any) => {
  const response = await api.put(`/process/${processId}/steps/${stepId}`, data);
  return response.data;
};

export const assignStaffToStep = async (processId: string, stepId: string, staffId: string) => {
  const response = await api.post(`/process/${processId}/steps/${stepId}/assign`, { staff_id: staffId });
  return response.data;
};

// Loss Management
export const getLossReports = async (params?: {
  department_id?: number;
  status?: string;
  skip?: number;
  limit?: number;
}) => {
  const response = await api.get('/loss', { params });
  return response.data;
};

export const createLossReport = async (data: any) => {
  const response = await api.post('/loss', data);
  return response.data;
};

export const updateLossReport = async (id: string, data: any) => {
  const response = await api.put(`/loss/${id}`, data);
  return response.data;
};

// Analytics & Reports
export const getDashboardStats = async () => {
  const response = await api.get('/analytics/dashboard');
  return response.data;
};

export const getActivityFeed = async (limit?: number) => {
  const response = await api.get('/analytics/activity-feed', { params: { limit } });
  return response.data;
};

export const getDepartmentPerformance = async (params?: {
  start_date?: string;
  end_date?: string;
}) => {
  const response = await api.get('/analytics/department-performance', { params });
  return response.data;
};

export const getEfficiencyReport = async (params?: {
  start_date?: string;
  end_date?: string;
}) => {
  const response = await api.get('/reports/efficiency', { params });
  return response.data;
};

export const getInventoryStatus = async () => {
  const response = await api.get('/reports/inventory-status');
  return response.data;
};

export const getUsageReport = async (params?: {
  start_date?: string;
  end_date?: string;
  department_id?: number;
}) => {
  const response = await api.get('/reports/usage', { params });
  return response.data;
};

// Settings
export const getNotificationSettings = async () => {
  const response = await api.get('/settings/notifications');
  return response.data;
};

export const updateNotificationSetting = async (id: string, data: any) => {
  const response = await api.put(`/settings/notifications/${id}`, data);
  return response.data;
};

export const getSystemSettings = async () => {
  const response = await api.get('/settings/system');
  return response.data;
};

export const updateSystemSetting = async (key: string, value: any) => {
  const response = await api.put(`/settings/system/${key}`, { value });
  return response.data;
};

// Inventory
export const getInventoryAlerts = async () => {
  const response = await api.get('/inventory/alerts');
  return response.data;
};

export const getStockLevels = async () => {
  const response = await api.get('/inventory/stock-levels');
  return response.data;
};

export const getInventoryMovement = async (params?: {
  start_date?: string;
  end_date?: string;
  department_id?: number;
}) => {
  const response = await api.get('/inventory/movement-history', { params });
  return response.data;
};

export default api;