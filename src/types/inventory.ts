export interface InventoryItem {
  id: string;
  linenType: string;
  totalQuantity: number;
  availableQuantity: number;
  inUseQuantity: number;
  inLaundryQuantity: number;
  damagedQuantity: number;
  lastUpdated: Date;
  reorderPoint: number;
  department?: string;
}

export interface InventoryMovement {
  id: string;
  itemId: string;
  type: 'check_out' | 'check_in' | 'damaged' | 'repaired' | 'disposed';
  quantity: number;
  department?: string;
  timestamp: Date;
  notes?: string;
}

export interface InventoryAlert {
  id: string;
  type: 'low_stock' | 'reorder' | 'excess' | 'damaged';
  itemId: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  acknowledged: boolean;
}