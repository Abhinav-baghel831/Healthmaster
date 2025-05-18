import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Utensils } from 'lucide-react';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { indianFoodData } from '../../data/indianFood';
import type { FoodItem } from '../../lib/types';

interface FoodFormData {
  foodId: number;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface FoodEntryWithDetails extends FoodFormData {
  food: FoodItem;
}

export const FoodTracker: React.FC = () => {
  const [foodEntries, setFoodEntries] = useState<FoodEntryWithDetails[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FoodFormData>({
    defaultValues: {
      quantity: 1,
      mealType: 'lunch'
    }
  });

  const onSubmit = (data: FoodFormData) => {
    const foodItem = indianFoodData.find(item => item.id === Number(data.foodId));
    if (foodItem) {
      const entryWithDetails: FoodEntryWithDetails = {
        ...data,
        foodId: Number(data.foodId),
        food: foodItem
      };
      setFoodEntries([...foodEntries, entryWithDetails]);
      reset({
        quantity: 1,
        mealType: 'lunch'
      });
    }
  };

  const calculateTotalNutrition = () => {
    return foodEntries.reduce(
      (totals, entry) => {
        const multiplier = entry.quantity;
        return {
          calories: totals.calories + entry.food.calories * multiplier,
          protein: totals.protein + entry.food.protein * multiplier,
          carbs: totals.carbs + entry.food.carbohydrates * multiplier,
          fat: totals.fat + entry.food.fat * multiplier,
          fiber: totals.fiber + entry.food.fiber * multiplier
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  };

  const totalNutrition = calculateTotalNutrition();

  return (
    <Card
      title="Diet Tracker"
      description="Track your food intake and nutrition from Indian cuisine"
      className="mb-6"
    >
      <div className="flex flex-col space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Food Item"
              options={indianFoodData.map(food => ({
                value: food.id,
                label: food.name
              }))}
              error={errors.foodId?.message}
              {...register('foodId', { required: 'Food item is required' })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Quantity"
                min="0.25"
                step="0.25"
                error={errors.quantity?.message}
                {...register('quantity', { 
                  required: 'Quantity is required',
                  min: { value: 0.25, message: 'Min quantity is 0.25' }
                })}
              />
              <Select
                label="Meal Type"
                options={[
                  { value: 'breakfast', label: 'Breakfast' },
                  { value: 'lunch', label: 'Lunch' },
                  { value: 'dinner', label: 'Dinner' },
                  { value: 'snack', label: 'Snack' }
                ]}
                error={errors.mealType?.message}
                {...register('mealType', { required: 'Meal type is required' })}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4" variant="success">
            Add Food
          </Button>
        </form>

        <div className="mt-6 bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-green-500" />
              Today's Nutrition Summary
            </h3>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <span className="text-xs font-medium text-red-800 uppercase">Calories</span>
                <p className="mt-1 text-2xl font-semibold text-red-700">
                  {Math.round(totalNutrition.calories)}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <span className="text-xs font-medium text-blue-800 uppercase">Protein</span>
                <p className="mt-1 text-2xl font-semibold text-blue-700">
                  {totalNutrition.protein.toFixed(1)}g
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <span className="text-xs font-medium text-yellow-800 uppercase">Carbs</span>
                <p className="mt-1 text-2xl font-semibold text-yellow-700">
                  {totalNutrition.carbs.toFixed(1)}g
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <span className="text-xs font-medium text-orange-800 uppercase">Fat</span>
                <p className="mt-1 text-2xl font-semibold text-orange-700">
                  {totalNutrition.fat.toFixed(1)}g
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <span className="text-xs font-medium text-green-800 uppercase">Fiber</span>
                <p className="mt-1 text-2xl font-semibold text-green-700">
                  {totalNutrition.fiber.toFixed(1)}g
                </p>
              </div>
            </div>
          </div>
        </div>

        {foodEntries.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Food Log</h4>
            <div className="overflow-auto max-h-64">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {foodEntries.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.food.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.quantity}x</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="capitalize">{entry.mealType}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.round(entry.food.calories * entry.quantity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(entry.food.protein * entry.quantity).toFixed(1)}g
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