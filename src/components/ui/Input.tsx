import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', fullWidth = true, ...props }, ref) => {
    const inputClasses = `px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? 'border-red-500' : 'border-gray-300'}
      ${fullWidth ? 'w-full' : ''}
      ${className}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';