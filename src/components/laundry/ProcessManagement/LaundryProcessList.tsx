import React from 'react';
import { LaundryProcessCard } from './LaundryProcessCard';
import type { LaundryProcess } from '../../../types/laundry';

interface LaundryProcessListProps {
  processes: LaundryProcess[];
  onStepComplete: (processId: string, stepId: string) => void;
  onAssignStaff: (processId: string, stepId: string, staffId: string) => void;
}

export const LaundryProcessList: React.FC<LaundryProcessListProps> = ({
  processes,
  onStepComplete,
  onAssignStaff,
}) => {
  return (
    <div className="space-y-6">
      {processes.map((process) => (
        <LaundryProcessCard
          key={process.id}
          process={process}
          onStepComplete={onStepComplete}
          onAssignStaff={onAssignStaff}
        />
      ))}
      {processes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No active laundry processes.
        </div>
      )}
    </div>
  );
};