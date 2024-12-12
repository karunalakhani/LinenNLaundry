import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface LaundryOrderFormProps {
  onSubmit: (order: {
    department: string;
    items: { type: string; quantity: number }[];
    priority: 'low' | 'medium' | 'high';
  }) => void;
}

export const LaundryOrderForm: React.FC<LaundryOrderFormProps> = ({ onSubmit }) => {
  const [department, setDepartment] = useState('');
  const [items, setItems] = useState([{ type: '', quantity: 1 }]);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ department, items, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">New Laundry Order</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            <option value="emergency">Emergency</option>
            <option value="surgery">Surgery</option>
            <option value="icu">ICU</option>
            <option value="general">General Ward</option>
          </select>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Item Type</label>
              <input
                type="text"
                value={item.type}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].type = e.target.value;
                  setItems(newItems);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].quantity = parseInt(e.target.value);
                  setItems(newItems);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Order
        </button>
      </div>
    </form>
  );
};