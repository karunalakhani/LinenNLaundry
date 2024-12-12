import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { LinenTable } from '../components/linen/LinenTable';
import { LinenForm } from '../components/linen/LinenForm';
import { useLinens, useLinenMutations } from '../hooks/useApi';
import type { LinenItem } from '../types/linen';

export const LinenManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingLinen, setEditingLinen] = useState<LinenItem | null>(null);
  
  const { data: linens, isLoading } = useLinens();
  const { createMutation, updateMutation, deleteMutation } = useLinenMutations();

  const handleAddNew = () => {
    setEditingLinen(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    const linen = linens?.find(l => l.id === id);
    if (linen) {
      setEditingLinen(linen);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (data: Omit<LinenItem, 'id'>) => {
    if (editingLinen) {
      updateMutation.mutate({ id: editingLinen.id, data });
    } else {
      createMutation.mutate(data);
    }
    setShowForm(false);
    setEditingLinen(null);
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Linen Management</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-axonic-primary hover:bg-axonic-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-axonic-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Linen
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingLinen ? 'Edit Linen' : 'Add New Linen'}
          </h2>
          <LinenForm
            initialData={editingLinen || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingLinen(null);
            }}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <LinenTable
            linens={linens || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};