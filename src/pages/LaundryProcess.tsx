import React from 'react';
import { Loader } from 'lucide-react';
import { LaundryProcessList } from '../components/laundry/ProcessManagement/LaundryProcessList';
import { useProcesses, useProcessMutations } from '../hooks/useApi';

export const LaundryProcess: React.FC = () => {
  const { data: processes, isLoading } = useProcesses();
  const { updateStepMutation, assignStaffMutation } = useProcessMutations();

  const handleStepComplete = (processId: string, stepId: string) => {
    updateStepMutation.mutate({
      processId,
      stepId,
      data: { status: 'completed' }
    });
  };

  const handleAssignStaff = (processId: string, stepId: string, staffId: string) => {
    assignStaffMutation.mutate({ processId, stepId, staffId });
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Laundry Process Management</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Loader className="w-4 h-4 mr-2" />
          {processes?.length || 0} Active Processes
        </div>
      </div>

      <LaundryProcessList
        processes={processes || []}
        onStepComplete={handleStepComplete}
        onAssignStaff={handleAssignStaff}
      />
    </div>
  );
};