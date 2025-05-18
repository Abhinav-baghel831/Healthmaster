import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Moon, ArrowUpDown } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface SleepFormData {
  date: string;
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
}

export const SleepTracker: React.FC = () => {
  const [sleepEntries, setSleepEntries] = useState<SleepFormData[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SleepFormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      quality: 'good'
    }
  });

  const onSubmit = (data: SleepFormData) => {
    setSleepEntries([data, ...sleepEntries]);
    reset({
      date: new Date().toISOString().split('T')[0],
      quality: 'good'
    });
  };

  const calculateAverageSleep = () => {
    if (sleepEntries.length === 0) return 0;
    const total = sleepEntries.reduce((sum, entry) => sum + entry.hours, 0);
    return total / sleepEntries.length;
  };

  return (
    <Card
      title="Sleep Tracker" 
      description="Log your sleep duration and quality"
      className="mb-6"
    >
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <Moon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600 font-medium">Last Sleep</p>
              <p className="text-2xl font-bold text-indigo-700">
                {sleepEntries.length > 0 
                  ? `${sleepEntries[0].hours} hours` 
                  : 'No data'}
              </p>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <ArrowUpDown className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Average Sleep</p>
              <p className="text-2xl font-bold text-purple-700">
                {calculateAverageSleep().toFixed(1)} hours
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="date"
              label="Date"
              error={errors.date?.message}
              {...register('date', { required: 'Date is required' })}
            />
            <Input
              type="number"
              step="0.5"
              label="Sleep Duration (hours)"
              placeholder="Hours of sleep"
              error={errors.hours?.message}
              {...register('hours', { 
                required: 'Sleep duration is required',
                min: { value: 0, message: 'Cannot be negative' },
                max: { value: 24, message: 'Cannot exceed 24 hours' }
              })}
            />
            <Select
              label="Sleep Quality"
              options={[
                { value: 'poor', label: 'Poor' },
                { value: 'fair', label: 'Fair' },
                { value: 'good', label: 'Good' },
                { value: 'excellent', label: 'Excellent' }
              ]}
              error={errors.quality?.message}
              {...register('quality', { required: 'Sleep quality is required' })}
            />
          </div>
          <Input
            label="Notes (optional)"
            placeholder="Any notes about your sleep"
            {...register('notes')}
          />
          <Button type="submit" className="mt-4" variant="secondary">
            Log Sleep
          </Button>
        </form>

        {sleepEntries.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Sleep History</h4>
            <div className="overflow-auto max-h-64">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sleepEntries.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.hours}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${entry.quality === 'excellent' ? 'bg-green-100 text-green-800' : 
                            entry.quality === 'good' ? 'bg-blue-100 text-blue-800' : 
                            entry.quality === 'fair' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {entry.quality.charAt(0).toUpperCase() + entry.quality.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.notes || '-'}</td>
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