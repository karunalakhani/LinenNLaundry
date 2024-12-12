import React from 'react';
import { Package, AlertTriangle, RefreshCw } from 'lucide-react';
import type { InventoryItem } from '../../types/inventory';

interface InventoryOverviewProps {
  items: InventoryItem[];
}

export const InventoryOverview: React.FC<InventoryOverviewProps> = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.totalQuantity, 0);
  const availableItems = items.reduce((sum, item) => sum + item.availableQuantity, 0);
  const inUseItems = items.reduce((sum, item) => sum + item.inUseQuantity, 0);
  const damagedItems = items.reduce((sum, item) => sum + item.damagedQuantity, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Items</p>
            <h3 className="text-2xl font-bold">{totalItems}</h3>
          </div>
          <Package className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Available</p>
            <h3 className="text-2xl font-bold">{availableItems}</h3>
          </div>
          <Package className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">In Use</p>
            <h3 className="text-2xl font-bold">{inUseItems}</h3>
          </div>
          <RefreshCw className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Damaged</p>
            <h3 className="text-2xl font-bold">{damagedItems}</h3>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
      </div>
    </div>
  );
};