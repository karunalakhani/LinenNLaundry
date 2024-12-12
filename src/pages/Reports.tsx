import React, { useState } from 'react';
import { ReportFilters } from '../components/reports/ReportFilters';
import { EfficiencyMetricsCard } from '../components/reports/EfficiencyMetricsCard';
import { CostAnalysisChart } from '../components/reports/CostAnalysisChart';
import { TrendAnalysisChart } from '../components/reports/TrendAnalysisChart';
import { useEfficiencyReport, useInventoryStatus, useUsageReport } from '../hooks/useApi';

export const Reports: React.FC = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [department, setDepartment] = useState('all');

  const { data: efficiencyData, isLoading: efficiencyLoading } = useEfficiencyReport({
    start_date: getStartDate(timeframe),
    end_date: new Date().toISOString()
  });

  const { data: inventoryData, isLoading: inventoryLoading } = useInventoryStatus();
  
  const { data: usageData, isLoading: usageLoading } = useUsageReport({
    start_date: getStartDate(timeframe),
    end_date: new Date().toISOString(),
    department_id: department !== 'all' ? parseInt(department) : undefined
  });

  if (efficiencyLoading || inventoryLoading || usageLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>

      <ReportFilters
        timeframe={timeframe}
        department={department}
        onTimeframeChange={setTimeframe}
        onDepartmentChange={setDepartment}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EfficiencyMetricsCard metrics={efficiencyData || {}} />
        <CostAnalysisChart data={usageData || {}} />
      </div>

      <div className="mb-6">
        <TrendAnalysisChart data={inventoryData || []} />
      </div>
    </div>
  );
};

function getStartDate(timeframe: string): string {
  const date = new Date();
  switch (timeframe) {
    case 'week':
      date.setDate(date.getDate() - 7);
      break;
    case 'month':
      date.setMonth(date.getMonth() - 1);
      break;
    case 'quarter':
      date.setMonth(date.getMonth() - 3);
      break;
    case 'year':
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      date.setHours(0, 0, 0, 0); // today
  }
  return date.toISOString();
}