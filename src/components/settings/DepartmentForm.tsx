import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { DepartmentConfig } from '../../types/settings';

interface DepartmentFormProps {
  onSubmit: (department: Omit<DepartmentConfig, 'id'>) => void;
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    linenQuota: 100,
    priority: 'medium' as DepartmentConfig['priority'],
    autoReorderThreshold: 20
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      linenQuota: 100,
      priority: 'medium',
      autoReorderThreshold: 20
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Plus className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-semibold">Add New Department</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Linen Quota
          </label>
          <input
            type="number"
            value={formData.linenQuota}
            onChange={(e) => setFormData({ ...formData, linenQuota: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as DepartmentConfig['priority'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Auto-reorder Threshold (%)
          </label>
          <input
            type="number"
            value={formData.autoReorderThreshold}
            onChange={(e) => setFormData({ ...formData, autoReorderThreshold: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
            max="100"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Department
        </button>
      </div>
    </form>
  );
};