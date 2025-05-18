/*
  # Initial schema for Healthmaster
  
  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `age` (integer)
      - `weight` (numeric)
      - `height` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `activities`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `date` (date)
      - `steps` (integer)
      - `duration` (integer)
      - `activity_type` (text)
      - `created_at` (timestamptz)
    - `sleep_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `date` (date)
      - `hours` (numeric)
      - `quality` (text)
      - `notes` (text)
      - `created_at` (timestamptz)
    - `food_items`
      - `id` (integer, primary key)
      - `name` (text)
      - `calories` (numeric)
      - `protein` (numeric)
      - `carbohydrates` (numeric)
      - `fat` (numeric)
      - `fiber` (numeric)
    - `food_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `food_id` (integer, foreign key to food_items)
      - `date` (date)
      - `quantity` (numeric)
      - `meal_type` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for reading public food items data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  age INTEGER,
  weight NUMERIC,
  height NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  steps INTEGER NOT NULL,
  duration INTEGER,
  activity_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create sleep entries table
CREATE TABLE IF NOT EXISTS sleep_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  hours NUMERIC NOT NULL,
  quality TEXT CHECK (quality IN ('poor', 'fair', 'good', 'excellent')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create food items table
CREATE TABLE IF NOT EXISTS food_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  calories NUMERIC NOT NULL,
  protein NUMERIC NOT NULL,
  carbohydrates NUMERIC NOT NULL,
  fat NUMERIC NOT NULL,
  fiber NUMERIC NOT NULL
);

-- Create food entries table
CREATE TABLE IF NOT EXISTS food_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles ON DELETE CASCADE NOT NULL,
  food_id INTEGER REFERENCES food_items ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  quantity NUMERIC NOT NULL DEFAULT 1,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_entries ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Activities
CREATE POLICY "Users can view their own activities"
  ON activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities"
  ON activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities"
  ON activities FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities"
  ON activities FOR DELETE
  USING (auth.uid() = user_id);

-- Sleep entries
CREATE POLICY "Users can view their own sleep entries"
  ON sleep_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sleep entries"
  ON sleep_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sleep entries"
  ON sleep_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sleep entries"
  ON sleep_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Food items (public read-only)
CREATE POLICY "Anyone can view food items"
  ON food_items FOR SELECT
  TO authenticated
  USING (true);

-- Food entries
CREATE POLICY "Users can view their own food entries"
  ON food_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food entries"
  ON food_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food entries"
  ON food_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food entries"
  ON food_entries FOR DELETE
  USING (auth.uid() = user_id);