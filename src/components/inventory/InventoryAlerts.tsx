import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { InventoryAlert } from '../../types/inventory';

interface InventoryAlertsProps {
  alerts: InventoryAlert[];
  onAcknowledge: (id: string) => void;
}

export const InventoryAlerts: React.FC<InventoryAlertsProps> = ({ alerts, onAcknowledge }) => {
  const getSeverityColor = (severity: InventoryAlert['severity']) => {
    const colors = {
      low: 'bg-yellow-50 border-yellow-200',
      medium: 'bg-orange-50 border-orange-200',
      high: 'bg-red-50 border-red-200'
    };
    return colors[severity];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Inventory Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-3 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className={`w-5 h-5 ${alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                <div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
              {!alert.acknowledged && (
                <button
                  onClick={() => onAcknowledge(alert.id)}
                  className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Acknowledge</span>
                </button>
              )}
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <p className="text-center text-gray-500 py-4">No active alerts</p>
        )}
      </div>
    </div>
  );
};