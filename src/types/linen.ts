export interface LinenItem {
  id: string;
  type: string;
  status: 'available' | 'in_use' | 'in_laundry' | 'damaged';
  department?: string;
  lastUsed?: Date;
  condition: 'new' | 'good' | 'fair' | 'poor';
  serialNumber: string;
}

export interface LaundryOrder {
  id: string;
  department: string;
  items: LinenItem[];
  status: 'pending' | 'in_progress' | 'completed' | 'delivered';
  priority: 'low' | 'medium' | 'high';
  requestDate: Date;
  completionDate?: Date;
}

export interface DashboardStats {
  totalLinens: number;
  inLaundry: number;
  readyForDispatch: number;
  awaitingCleaning: number;
  damaged: number;
}