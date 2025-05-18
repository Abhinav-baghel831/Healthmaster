import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const { signUp, loading, error } = useAuth();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    await signUp(data.email, data.password);
    setRegistrationSuccess(true);
  };

  const password = watch('password');

  return (
    <Layout>
      <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                sign in if you already have an account
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div>
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {registrationSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div>
                  <p className="text-sm text-green-700">
                    Registration successful! Please check your email to verify your account.
                  </p>
                  <p className="mt-2 text-sm text-green-700">
                    <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                      Click here to sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <Input
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  className="mb-4"
                  placeholder="Email address"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  className="mb-4"
                  error={errors.password?.message}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                
                <Input
                  id="confirmPassword"
                  label="Confirm password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm password"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={loading}
                  variant="primary"
                  size="lg"
                >
                  Create account
                </Button>
              </div>
              
              <div className="text-sm text-center text-gray-600">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="font-medium text-green-600 hover:text-green-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-green-600 hover:text-green-500">
                  Privacy Policy
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};