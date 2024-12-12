import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { LossReportForm } from '../components/loss/LossReportForm';
import { LossReportTable } from '../components/loss/LossReportTable';
import { LossStatisticsCard } from '../components/loss/LossStatisticsCard';
import { useLossReports, useLossReportMutations } from '../hooks/useApi';
import type { LossReport } from '../types/loss';

export const LossManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: reports, isLoading } = useLossReports();
  const { createMutation, updateMutation } = useLossReportMutations();

  const handleNewReport = (reportData: Omit<LossReport, 'id' | 'status' | 'reportDate'>) => {
    createMutation.mutate(reportData, {
      onSuccess: () => setShowForm(false)
    });
  };

  const handleStatusUpdate = (id: string, status: LossReport['status']) => {
    updateMutation.mutate({ id, data: { status } });
  };

  const handleViewDetails = (id: string) => {
    // Implement view details functionality
    console.log('View details:', id);
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loss Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-axonic-primary hover:bg-axonic-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-axonic-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report Loss
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          {showForm ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Report Loss</h2>
              <LossReportForm
                onSubmit={handleNewReport}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md">
              <LossReportTable
                reports={reports || []}
                onStatusUpdate={handleStatusUpdate}
                onViewDetails={handleViewDetails}
              />
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <LossStatisticsCard statistics={reports?.statistics || {}} />
        </div>
      </div>
    </div>
  );
};