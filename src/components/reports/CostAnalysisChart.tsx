import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip
} from 'recharts';
import type { CostAnalysis } from '../../types/reports';

interface CostAnalysisChartProps {
  data: CostAnalysis;
}

export const CostAnalysisChart: React.FC<CostAnalysisChartProps> = ({ data }) => {
  const costBreakdown = [
    { name: 'Labor', value: data.laborCost },
    { name: 'Supplies', value: data.suppliesCost },
    { name: 'Maintenance', value: data.maintenanceCost }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={costBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {costBreakdown.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Cost per Pound</p>
          <p className="text-xl font-bold text-gray-900">${data.costPerPound.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Total Operating Cost</p>
          <p className="text-xl font-bold text-gray-900">${data.totalOperatingCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};