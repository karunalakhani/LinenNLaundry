import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { LinenTypeConfig } from '../../types/settings';

interface LinenTypeFormProps {
  onSubmit: (linenType: Omit<LinenTypeConfig, 'id'>) => void;
}

export const LinenTypeForm: React.FC<LinenTypeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'bedding' as LinenTypeConfig['category'],
    washingInstructions: '',
    replacementCycle: 180,
    minimumStock: 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      category: 'bedding',
      washingInstructions: '',
      replacementCycle: 180,
      minimumStock: 50
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Plus className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-semibold">Add New Linen Type</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
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
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as LinenTypeConfig['category'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="bedding">Bedding</option>
            <option value="surgical">Surgical</option>
            <option value="patient">Patient Care</option>
            <option value="staff">Staff Uniforms</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Washing Instructions
          </label>
          <textarea
            value={formData.washingInstructions}
            onChange={(e) => setFormData({ ...formData, washingInstructions: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Replacement Cycle (days)
          </label>
          <input
            type="number"
            value={formData.replacementCycle}
            onChange={(e) => setFormData({ ...formData, replacementCycle: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Stock
          </label>
          <input
            type="number"
            value={formData.minimumStock}
            onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Linen Type
        </button>
      </div>
    </form>
  );
};