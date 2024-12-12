export interface LaundryProcess {
  id: string;
  orderId: string;
  currentStep: string;
  startTime: Date;
  estimatedCompletion: Date;
  steps: LaundryStep[];
  assignedTo?: string;
  notes?: string;
}

export interface LaundryStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  assignedTo?: string;
  notes?: string;
}

export const LAUNDRY_STEPS = [
  'sorting',
  'pre_treatment',
  'washing',
  'drying',
  'folding',
  'quality_check',
  'packaging',
  'ready_for_delivery'
] as const;

export type LaundryStepType = typeof LAUNDRY_STEPS[number];