import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { LossStatistics } from '../../types/loss';

interface LossStatisticsCardProps {
  statistics: LossStatistics;
}

export const LossStatisticsCard: React.FC<LossStatisticsCardProps> = ({ statistics }) => {
  // Ensure statistics object has required properties with default values
  const {
    totalLosses = 0,
    totalCost = 0,
    byDepartment = {},
    byReason = {}
  } = statistics || {};

  // Transform data for charts with null checks
  const departmentData = Object.entries(byDepartment || {}).map(([name, value]) => ({
    name,
    value: value || 0
  }));

  const reasonData = Object.entries(byReason || {}).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value: value || 0
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Loss Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Losses</p>
            <p className="text-2xl font-bold text-blue-600">{totalLosses}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="text-2xl font-bold text-green-600">
              ${totalCost.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {departmentData.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Losses by Department</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {reasonData.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-2">Losses by Reason</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reasonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};