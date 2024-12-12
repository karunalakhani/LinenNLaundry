import React from 'react';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'pickup' | 'washing' | 'dispatch';
  department: string;
  timestamp: Date;
  description: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="p-2 bg-blue-50 rounded-full">
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium">{activity.description}</p>
              <p className="text-xs text-gray-500">
                {activity.department} • {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};