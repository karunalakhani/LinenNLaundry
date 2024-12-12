import React from 'react';
import { Edit2, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { LossReport } from '../../types/loss';

interface LossReportTableProps {
  reports: LossReport[];
  onStatusUpdate: (id: string, status: LossReport['status']) => void;
  onViewDetails: (id: string) => void;
}

export const LossReportTable: React.FC<LossReportTableProps> = ({
  reports,
  onStatusUpdate,
  onViewDetails,
}) => {
  const getStatusColor = (status: LossReport['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      investigating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      replaced: 'bg-purple-100 text-purple-800'
    };
    return colors[status];
  };

  const getReasonColor = (reason: LossReport['reason']) => {
    const colors = {
      lost: 'bg-orange-100 text-orange-800',
      damaged: 'bg-red-100 text-red-800',
      stolen: 'bg-red-100 text-red-800',
      wear_and_tear: 'bg-gray-100 text-gray-800'
    };
    return colors[reason];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reason
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Report Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {report.itemType}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {report.itemId}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {report.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                  {report.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getReasonColor(report.reason)}`}>
                  {report.reason.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDistanceToNow(report.reportDate, { addSuffix: true })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onViewDetails(report.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <select
                    value={report.status}
                    onChange={(e) => onStatusUpdate(report.id, e.target.value as LossReport['status'])}
                    className="text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="replaced">Replaced</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};