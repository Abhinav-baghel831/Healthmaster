import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface ProfileFormData {
  name: string;
  age: number;
  weight: number;
  height: number;
}

export const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProfileFormData>();

  const currentWeight = watch('weight');
  const currentHeight = watch('height');

  // Calculate BMI
  const calculateBMI = () => {
    if (!currentHeight || !currentWeight) return 0;
    
    // Convert height from cm to meters
    const heightInMeters = currentHeight / 100;
    return (currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // BMI categories
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmi = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(bmi);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, age, weight, height')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProfileData(data);
          setValue('name', data.name || '');
          setValue('age', data.age || '');
          setValue('weight', data.weight || '');
          setValue('height', data.height || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfileData();
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          name: data.name,
          age: data.age,
          weight: data.weight,
          height: data.height,
          updated_at: new Date()
        });
      
      if (error) throw error;
      
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  if (!user) return <Navigate to="/login" replace />;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-1 text-lg text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card title="Personal Information">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Full Name"
                  placeholder="Your name"
                  error={errors.name?.message}
                  {...register('name', { required: 'Name is required' })}
                />
                
                <Input
                  type="number"
                  label="Age"
                  placeholder="Your age"
                  error={errors.age?.message}
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 1, message: 'Age must be positive' },
                    max: { value: 120, message: 'Age cannot exceed 120' }
                  })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    label="Weight (kg)"
                    placeholder="Your weight in kg"
                    error={errors.weight?.message}
                    {...register('weight', { 
                      required: 'Weight is required',
                      min: { value: 20, message: 'Weight must be at least 20kg' },
                      max: { value: 250, message: 'Weight cannot exceed 250kg' }
                    })}
                  />
                  
                  <Input
                    type="number"
                    label="Height (cm)"
                    placeholder="Your height in cm"
                    error={errors.height?.message}
                    {...register('height', { 
                      required: 'Height is required',
                      min: { value: 50, message: 'Height must be at least 50cm' },
                      max: { value: 250, message: 'Height cannot exceed 250cm' }
                    })}
                  />
                </div>
                
                {updateSuccess && (
                  <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-sm text-green-700">Profile updated successfully!</p>
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="mt-2"
                  isLoading={isUpdating}
                >
                  Save Changes
                </Button>
              </form>
            </Card>
          </div>
          
          <div>
            <Card title="Health Metrics">
              <div className="text-center py-4">
                <h3 className="text-gray-500 text-sm uppercase tracking-wide">Your BMI</h3>
                <div className="mt-3 flex justify-center">
                  <div className={`text-5xl font-bold ${bmiCategory.color}`}>
                    {isNaN(bmi) ? '-' : bmi}
                  </div>
                </div>
                <p className={`mt-1 font-medium ${bmiCategory.color}`}>
                  {isNaN(bmi) ? 'Enter weight & height' : bmiCategory.category}
                </p>
                
                <div className="mt-6 relative h-4 bg-gray-200 rounded-full">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/4 bg-blue-500 rounded-l-full"></div>
                    <div className="w-1/4 bg-green-500"></div>
                    <div className="w-1/4 bg-yellow-500"></div>
                    <div className="w-1/4 bg-red-500 rounded-r-full"></div>
                  </div>
                  {!isNaN(bmi) && (
                    <div 
                      className="absolute top-0 w-1 h-6 bg-black" 
                      style={{ 
                        left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%`,
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                  )}
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Recommended BMI Range</h3>
                <p className="text-sm text-gray-600">
                  For your optimal health, maintain a BMI between 18.5 and 24.9.
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Note: BMI is a screening tool and not diagnostic of body fatness or health.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};