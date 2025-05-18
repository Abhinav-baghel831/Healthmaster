import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { LineChart, Salad, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:flex md:items-center md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Your Health Journey Starts Here
              </h1>
              <p className="text-xl mb-8 text-green-50">
                Track fitness, sleep, and nutrition with personalized insights and a focus on Indian cuisine.
              </p>
              <div className="space-x-4">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="bg-green-500 text-white hover:bg-green-600">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 opacity-20 rounded-full -mr-20 -mt-20"></div>
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-3">Track Your Progress</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 p-4 rounded-lg">
                      <p className="text-sm mb-1">Daily Steps</p>
                      <p className="text-2xl font-bold">8,432</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg">
                      <p className="text-sm mb-1">Sleep</p>
                      <p className="text-2xl font-bold">7.5 hrs</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg">
                      <p className="text-sm mb-1">Calories</p>
                      <p className="text-2xl font-bold">1,840</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg">
                      <p className="text-sm mb-1">Water</p>
                      <p className="text-2xl font-bold">2.1 L</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Complete Health Companion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HealthMaster provides everything you need to track, improve, and maintain your health with a special focus on Indian nutrition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100 transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <LineChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Tracking</h3>
              <p className="text-gray-600">
                Monitor your activity, sleep patterns, and diet all in one place with easy-to-read dashboards and insights.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100 transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <Salad className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Indian Food Database</h3>
              <p className="text-gray-600">
                Detailed nutritional information for popular Indian dishes, making it easy to track your traditional diet.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100 transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Insights</h3>
              <p className="text-gray-600">
                Get customized health tips and recommendations based on your progress and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
              <div className="md:w-3/5 mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Ready to transform your health journey?
                </h2>
                <p className="mt-2 text-white/90 text-lg">
                  Join thousands of users improving their wellness with HealthMaster.
                </p>
              </div>
              <div className="md:w-2/5 text-center md:text-right">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="bg-green-500 text-white hover:bg-green-600">
                    Start Your Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};