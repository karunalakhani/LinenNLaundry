import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface ReportFiltersProps {
  timeframe: string;
  department: string;
  onTimeframeChange: (timeframe: string) => void;
  onDepartmentChange: (department: string) => void;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  timeframe,
  department,
  onTimeframeChange,
  onDepartmentChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline-block mr-1" />
            Time Period
          </label>
          <select
            value={timeframe}
            onChange={(e) => onTimeframeChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Filter className="w-4 h-4 inline-block mr-1" />
            Department
          </label>
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="emergency">Emergency</option>
            <option value="surgery">Surgery</option>
            <option value="icu">ICU</option>
            <option value="general">General Ward</option>
          </select>
        </div>
      </div>
    </div>
  );
};