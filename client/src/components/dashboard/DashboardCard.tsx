import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  className = '',
  action,
  onClick,
  loading = false
}) => {
  const cardClasses = `bg-white rounded-xl shadow-sm border border-champagne/30 p-4 sm:p-6 transition-all duration-300 
    hover:shadow-md hover:-translate-y-0.5 ${className} ${loading ? 'animate-pulse' : ''}`.trim();

  if (loading) {
    return (
      <div className={cardClasses}>
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${cardClasses} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={onClick}
    >
      {title && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-champagne">
          <h3 className="text-lg sm:text-2xl font-primary font-normal text-graphite">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard; 