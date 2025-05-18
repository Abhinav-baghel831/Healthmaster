import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  description,
  footer
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="p-4 border-b">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="p-4 bg-gray-50 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};