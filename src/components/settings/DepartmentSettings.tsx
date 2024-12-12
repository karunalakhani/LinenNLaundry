import React from 'react';
import { Building, Trash2 } from 'lucide-react';
import type { DepartmentConfig } from '../../types/settings';
import { DepartmentForm } from './DepartmentForm';
import { useSystemSettings, useSettingsMutations } from '../../hooks/useApi';

interface DepartmentSettingsProps {
  departments: DepartmentConfig[];
  onUpdate: (departments: DepartmentConfig[]) => void;
}

export const DepartmentSettings: React.FC<DepartmentSettingsProps> = ({
  departments,
  onUpdate
}) => {
  const { data: systemSettings, isLoading } = useSystemSettings();
  const { updateSystemMutation } = useSettingsMutations();

  const getPriorityColor = (priority: DepartmentConfig['priority']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  const handleAddDepartment = (departmentData: Omit<DepartmentConfig, 'id'>) => {
    const newDepartment: DepartmentConfig = {
      ...departmentData,
      id: Date.now().toString()
    };
    const updatedDepartments = [...departments, newDepartment];
    updateSystemMutation.mutate({
      key: 'departments',
      value: updatedDepartments
    });
  };

  const handleDeleteDepartment = (id: string) => {
    const updatedDepartments = departments.filter(dept => dept.id !== id);
    updateSystemMutation.mutate({
      key: 'departments',
      value: updatedDepartments
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <DepartmentForm onSubmit={handleAddDepartment} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Building className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold">Department List</h2>
        </div>

        <div className="grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-t-lg font-medium text-sm text-gray-600">
          <div className="col-span-4">Department Name</div>
          <div className="col-span-3">Linen Quota</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Reorder At</div>
          <div className="col-span-1">Actions</div>
        </div>

        <div className="space-y-2">
          {departments.map(dept => (
            <div key={dept.id} className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg items-center">
              <div className="col-span-4 font-medium text-gray-900">
                {dept.name}
              </div>
              <div className="col-span-3 text-gray-700">
                {dept.linenQuota} items
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(dept.priority)}`}>
                  {dept.priority}
                </span>
              </div>
              <div className="col-span-2 text-gray-700">
                {dept.autoReorderThreshold}%
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => handleDeleteDepartment(dept.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {departments.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No departments configured.
          </div>
        )}
      </div>
    </div>
  );
};