import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ActivityTracker } from '../components/dashboard/ActivityTracker';
import { SleepTracker } from '../components/dashboard/SleepTracker';
import { FoodTracker } from '../components/dashboard/FoodTracker';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    document.title = 'Dashboard | HealthMaster';
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  if (!user) return <Navigate to="/login" replace />;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-lg text-gray-600">
            Track your health metrics and daily activities
          </p>
        </div>

        <div className="mb-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
          <p>
            You're making progress on your health journey. Keep up the good work!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-6">
            <ActivityTracker />
          </div>
          <div className="md:col-span-3">
            <SleepTracker />
          </div>
          <div className="md:col-span-3">
            <FoodTracker />
          </div>
        </div>
      </div>
    </Layout>
  );
};