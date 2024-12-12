import React, { useState } from 'react';
import { InventoryOverview } from '../components/inventory/InventoryOverview';
import { InventoryTable } from '../components/inventory/InventoryTable';
import { InventoryAlerts } from '../components/inventory/InventoryAlerts';
import { useInventoryAlerts, useStockLevels } from '../hooks/useApi';

export const Inventory: React.FC = () => {
  const { data: inventory, isLoading: inventoryLoading } = useStockLevels();
  const { data: alerts, isLoading: alertsLoading } = useInventoryAlerts();

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit item:', id);
  };

  const handleAcknowledgeAlert = (id: string) => {
    // Implement acknowledge functionality
    console.log('Acknowledge alert:', id);
  };

  if (inventoryLoading || alertsLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      
      <InventoryOverview items={inventory?.items || []} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventoryTable
            items={inventory?.items || []}
            onEdit={handleEdit}
          />
        </div>
        <div className="lg:col-span-1">
          <InventoryAlerts
            alerts={alerts || []}
            onAcknowledge={handleAcknowledgeAlert}
          />
        </div>
      </div>
    </div>
  );
};