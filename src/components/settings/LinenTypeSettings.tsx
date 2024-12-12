import React from 'react';
import { Shirt, Trash2 } from 'lucide-react';
import type { LinenTypeConfig } from '../../types/settings';
import { LinenTypeForm } from './LinenTypeForm';

interface LinenTypeSettingsProps {
  linenTypes: LinenTypeConfig[];
  onUpdate: (linenTypes: LinenTypeConfig[]) => void;
}

export const LinenTypeSettings: React.FC<LinenTypeSettingsProps> = ({
  linenTypes,
  onUpdate
}) => {
  const getCategoryColor = (category: LinenTypeConfig['category']) => {
    const colors = {
      bedding: 'bg-blue-100 text-blue-800',
      surgical: 'bg-green-100 text-green-800',
      patient: 'bg-purple-100 text-purple-800',
      staff: 'bg-orange-100 text-orange-800'
    };
    return colors[category];
  };

  const handleAddLinenType = (linenTypeData: Omit<LinenTypeConfig, 'id'>) => {
    const newLinenType: LinenTypeConfig = {
      ...linenTypeData,
      id: Date.now().toString()
    };
    onUpdate([...linenTypes, newLinenType]);
  };

  const handleDeleteLinenType = (id: string) => {
    onUpdate(linenTypes.filter(type => type.id !== id));
  };

  return (
    <div className="space-y-6">
      <LinenTypeForm onSubmit={handleAddLinenType} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Shirt className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold">Linen Types</h2>
        </div>

        <div className="space-y-4">
          {linenTypes.map(type => (
            <div key={type.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(type.category)}`}>
                    {type.category}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteLinenType(type.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Washing Instructions:</span>
                  <p className="mt-1 text-gray-600">{type.washingInstructions}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Replacement Cycle:</span>
                  <p className="mt-1 text-gray-600">{type.replacementCycle} days</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Minimum Stock:</span>
                  <p className="mt-1 text-gray-600">{type.minimumStock} items</p>
                </div>
              </div>
            </div>
          ))}

          {linenTypes.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No linen types configured.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};