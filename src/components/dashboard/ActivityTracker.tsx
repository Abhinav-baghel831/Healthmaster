import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Activity, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ActivityFormData {
  steps: number;
  activityType: string;
  duration: number;
}

export const ActivityTracker: React.FC = () => {
  const [activities, setActivities] = useState<ActivityFormData[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ActivityFormData>();

  const onSubmit = (data: ActivityFormData) => {
    setActivities([...activities, data]);
    reset();
  };

  const totalSteps = activities.reduce((sum, activity) => sum + activity.steps, 0);
  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);

  return (
    <Card
      title="Activity Tracker"
      description="Track your daily physical activities"
      className="mb-6"
    >
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Steps</p>
              <p className="text-2xl font-bold text-blue-700">{totalSteps.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Active Minutes</p>
              <p className="text-2xl font-bold text-green-700">{totalDuration}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              label="Steps"
              placeholder="Number of steps"
              error={errors.steps?.message}
              {...register('steps', { 
                required: 'Steps is required',
                min: { value: 1, message: 'Steps must be positive' }
              })}
            />
            <Input
              label="Activity Type"
              placeholder="Walking, Running, etc."
              error={errors.activityType?.message}
              {...register('activityType', { required: 'Activity type is required' })}
            />
            <Input
              type="number"
              label="Duration (minutes)"
              placeholder="Duration in minutes"
              error={errors.duration?.message}
              {...register('duration', { 
                required: 'Duration is required',
                min: { value: 1, message: 'Duration must be positive' }
              })}
            />
          </div>
          <Button type="submit" className="mt-4" variant="primary">
            Add Activity
          </Button>
        </form>

        {activities.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Recent Activities</h4>
            <div className="overflow-auto max-h-64">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Steps
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activity.activityType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.steps}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.duration} min
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};