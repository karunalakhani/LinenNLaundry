export interface DepartmentConfig {
  id: string;
  name: string;
  linenQuota: number;
  priority: 'low' | 'medium' | 'high';
  autoReorderThreshold: number;
}

export interface LinenTypeConfig {
  id: string;
  name: string;
  category: 'bedding' | 'surgical' | 'patient' | 'staff';
  washingInstructions: string;
  replacementCycle: number; // in days
  minimumStock: number;
}

export interface LaundryWorkflowStep {
  id: string;
  name: string;
  duration: number; // in minutes
  requiresInspection: boolean;
  assignedRole: string;
}

export interface NotificationSetting {
  type: 'stock' | 'maintenance' | 'delivery' | 'quality';
  enabled: boolean;
  threshold?: number;
  recipients: string[];
}