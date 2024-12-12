import type { LinenItem, LaundryOrder } from './linen';
import type { LossReport } from './loss';

export interface ReportTimeframe {
  start: Date;
  end: Date;
}

export interface DepartmentUsageReport {
  department: string;
  totalItems: number;
  activeOrders: number;
  completedOrders: number;
  averageTurnaroundTime: number; // in hours
  lossRate: number; // percentage
  costPerItem: number;
}

export interface EfficiencyMetrics {
  averageProcessingTime: number; // in hours
  turnaroundTime: number; // in hours
  utilizationRate: number; // percentage
  complianceRate: number; // percentage
  qualityScore: number; // percentage
}

export interface CostAnalysis {
  totalOperatingCost: number;
  laborCost: number;
  suppliesCost: number;
  maintenanceCost: number;
  costPerPound: number;
  costPerDepartment: Record<string, number>;
}

export interface TrendAnalysis {
  period: string;
  volume: number;
  efficiency: number;
  quality: number;
  cost: number;
}