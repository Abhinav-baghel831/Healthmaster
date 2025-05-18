import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { healthTipsData } from '../data/healthTips';
import { Lightbulb, Shuffle, Filter, Leaf, Dumbbell, Moon } from 'lucide-react';

export const HealthTipsPage: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [featuredTipIndex, setFeaturedTipIndex] = useState<number>(
    Math.floor(Math.random() * healthTipsData.length)
  );

  const filteredTips = filter
    ? healthTipsData.filter(tip => tip.category === filter)
    : healthTipsData;

  const randomizeFeaturedTip = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * healthTipsData.length);
    } while (newIndex === featuredTipIndex);
    
    setFeaturedTipIndex(newIndex);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Nutrition':
        return <Leaf className="h-5 w-5" />;
      case 'Fitness':
        return <Dumbbell className="h-5 w-5" />;
      case 'Sleep':
        return <Moon className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nutrition':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Fitness':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sleep':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Health Tips</h1>
          <p className="mt-1 text-lg text-gray-600">
            Expert advice for your wellness journey
          </p>
        </div>

        {/* Featured Tip */}
        <div className="mb-10">
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
                <div className="bg-blue-100 rounded-full p-4 inline-flex items-center justify-center">
                  <Lightbulb size={32} className="text-blue-600" />
                </div>
              </div>
              <div className="md:w-4/6 text-center md:text-left md:pr-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tip of the Day</h3>
                <p className="text-lg text-gray-700">
                  {healthTipsData[featuredTipIndex].tip}
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  Source: {healthTipsData[featuredTipIndex].source}
                </div>
              </div>
              <div className="md:w-1/6 flex justify-center mt-4 md:mt-0">
                <Button 
                  onClick={randomizeFeaturedTip}
                  className="flex items-center"
                  variant="outline"
                >
                  <Shuffle size={18} className="mr-2" />
                  New Tip
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={filter === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter(null)}
            className="flex items-center"
          >
            <Filter size={16} className="mr-1" />
            All Tips
          </Button>
          <Button
            variant={filter === 'Nutrition' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('Nutrition')}
            className="flex items-center"
          >
            <Leaf size={16} className="mr-1" />
            Nutrition
          </Button>
          <Button
            variant={filter === 'Fitness' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('Fitness')}
            className="flex items-center"
          >
            <Dumbbell size={16} className="mr-1" />
            Fitness
          </Button>
          <Button
            variant={filter === 'Sleep' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('Sleep')}
            className="flex items-center"
          >
            <Moon size={16} className="mr-1" />
            Sleep
          </Button>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <div 
              key={tip.id}
              className={`rounded-lg border p-4 transition-transform hover:transform hover:scale-105 ${getCategoryColor(tip.category)}`}
            >
              <div className="flex items-start mb-3">
                <div className="mr-2 mt-0.5">
                  {getCategoryIcon(tip.category)}
                </div>
                <h3 className="font-medium">{tip.category}</h3>
              </div>
              <p className="text-gray-800 mb-3">{tip.tip}</p>
              <p className="text-xs text-gray-600">Source: {tip.source}</p>
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tips found for the selected category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};