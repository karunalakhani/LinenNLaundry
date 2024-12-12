import React from 'react';
import { Clock, TrendingUp, CheckCircle, BarChart2 } from 'lucide-react';
import type { EfficiencyMetrics } from '../../types/reports';

interface EfficiencyMetricsCardProps {
  metrics: EfficiencyMetrics;
}

export const EfficiencyMetricsCard: React.FC<EfficiencyMetricsCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Efficiency Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">Avg. Processing Time</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{metrics.averageProcessingTime}h</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">Utilization Rate</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{metrics.utilizationRate}%</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm text-gray-600">Compliance Rate</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{metrics.complianceRate}%</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BarChart2 className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-sm text-gray-600">Quality Score</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{metrics.qualityScore}%</p>
        </div>
      </div>
    </div>
  );
};