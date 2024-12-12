import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { LaundryOrderTable } from '../components/laundry/LaundryOrderTable';
import { LaundryOrderForm } from '../components/laundry/LaundryOrderForm';
import { useLaundryOrders, useLaundryOrderMutations } from '../hooks/useApi';
import type { LaundryOrder } from '../types/linen';

export const LaundryOrders: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: orders, isLoading } = useLaundryOrders();
  const { createMutation, updateMutation } = useLaundryOrderMutations();

  const handleStatusUpdate = (id: string, status: LaundryOrder['status']) => {
    updateMutation.mutate({ id, data: { status } });
  };

  const handleNewOrder = (orderData: {
    department: string;
    items: { type: string; quantity: number }[];
    priority: 'low' | 'medium' | 'high';
  }) => {
    createMutation.mutate(orderData, {
      onSuccess: () => setShowForm(false)
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Laundry Orders</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-axonic-primary hover:bg-axonic-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-axonic-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </button>
      </div>

      {showForm ? (
        <div className="mb-6">
          <LaundryOrderForm
            onSubmit={handleNewOrder}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <LaundryOrderTable
            orders={orders || []}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      )}
    </div>
  );
};