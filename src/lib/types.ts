export interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  weight?: number;
  height?: number;
  created_at?: string;
}

export interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}

export interface SleepEntry {
  id: string;
  user_id: string;
  date: string;
  hours: number;
  quality?: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
}

export interface ActivityEntry {
  id: string;
  user_id: string;
  date: string;
  steps: number;
  duration?: number; // in minutes
  activity_type?: string;
  calories_burned?: number;
}

export interface FoodEntry {
  id: string;
  user_id: string;
  food_id: number;
  date: string;
  quantity: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface HealthTip {
  id: number;
  category: string;
  tip: string;
  source?: string;
}