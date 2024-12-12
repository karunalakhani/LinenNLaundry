export interface LossStatistics {
  totalLosses: number;
  totalCost: number;
  byDepartment: Record<string, number>;
  byReason: Record<string, number>;
}

export interface LossReport {
  id: string;
  itemId: string;
  itemType: string;
  quantity: number;
  department: string;
  reportDate: Date;
  reportedBy: string;
  status: 'pending' | 'investigating' | 'resolved' | 'replaced';
  reason: 'lost' | 'damaged' | 'stolen' | 'wear_and_tear';
  description: string;
  resolutionNotes?: string;
  replacementCost?: number;
  investigationFindings?: string;
  resolvedDate?: Date;
}

export interface LossReportResponse {
  reports: LossReport[];
  statistics: LossStatistics;
}