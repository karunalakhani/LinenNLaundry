import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { LaundryProcess, LaundryStep } from '../../../types/laundry';

interface LaundryProcessCardProps {
  process: LaundryProcess;
  onStepComplete: (processId: string, stepId: string) => void;
  onAssignStaff: (processId: string, stepId: string, staffId: string) => void;
}

export const LaundryProcessCard: React.FC<LaundryProcessCardProps> = ({
  process,
  onStepComplete,
  onAssignStaff,
}) => {
  const getStepIcon = (status: LaundryStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepColor = (status: LaundryStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      case 'in_progress':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Order #{process.orderId}</h3>
          <p className="text-sm text-gray-500">
            Started {formatDistanceToNow(process.startTime, { addSuffix: true })}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {process.assignedTo && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {process.assignedTo}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {process.steps.map((step) => (
          <div
            key={step.id}
            className={`border rounded-lg p-4 ${getStepColor(step.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStepIcon(step.status)}
                <span className="font-medium">{step.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {step.status === 'in_progress' && (
                  <select
                    value={step.assignedTo || ''}
                    onChange={(e) => onAssignStaff(process.id, step.id, e.target.value)}
                    className="text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Assign Staff</option>
                    <option value="staff1">John Doe</option>
                    <option value="staff2">Jane Smith</option>
                  </select>
                )}
                {step.status === 'in_progress' && (
                  <button
                    onClick={() => onStepComplete(process.id, step.id)}
                    className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
            {step.notes && (
              <p className="mt-2 text-sm text-gray-600">{step.notes}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Expected completion: {formatDistanceToNow(process.estimatedCompletion, { addSuffix: true })}
      </div>
    </div>
  );
};