import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import type { TrendAnalysis } from '../../types/reports';

interface TrendAnalysisChartProps {
  data: TrendAnalysis[];
}

export const TrendAnalysisChart: React.FC<TrendAnalysisChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#3B82F6"
              name="Volume"
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#10B981"
              name="Efficiency"
            />
            <Line
              type="monotone"
              dataKey="quality"
              stroke="#F59E0B"
              name="Quality"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};