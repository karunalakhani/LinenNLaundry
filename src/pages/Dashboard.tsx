import React from 'react';
import { BarChart3, Shirt, Loader, Package, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { useDashboardStats, useActivityFeed } from '../hooks/useApi';

export const Dashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useActivityFeed(10);

  if (statsLoading || activitiesLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Linen & Laundry Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Linens"
          value={stats?.totalLinens || 0}
          icon={<Shirt className="w-6 h-6 text-blue-500" />}
        />
        <StatsCard
          title="In Laundry"
          value={stats?.inLaundry || 0}
          icon={<Loader className="w-6 h-6 text-yellow-500" />}
        />
        <StatsCard
          title="Ready for Dispatch"
          value={stats?.readyForDispatch || 0}
          icon={<Package className="w-6 h-6 text-green-500" />}
        />
        <StatsCard
          title="Damaged Items"
          value={stats?.damaged || 0}
          icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Linen Usage Trends</h3>
            {/* Chart component will go here */}
          </div>
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed activities={activities || []} />
        </div>
      </div>
    </div>
  );
};