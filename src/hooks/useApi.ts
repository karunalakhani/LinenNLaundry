// Split into multiple files for better organization
import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as api from '../services/api';

// Create separate hook files
export * from './api/useDashboard';
export * from './api/useLinen';
export * from './api/useLaundry';
export * from './api/useInventory';
export * from './api/useLoss';
export * from './api/useReports';
export * from './api/useSettings';