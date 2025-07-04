import React from 'react';

interface MetricCardProps {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  trend,
  className = '',
  prefix = '',
  suffix = '',
  loading = false
}) => {
  const cardClasses = `relative bg-white rounded-xl shadow-sm border border-champagne/30 p-4 sm:p-6 text-center 
    transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 before:absolute before:inset-0 
    before:bg-gradient-to-br before:from-lavender/5 before:to-blush/5 before:rounded-xl before:opacity-0 
    hover:before:opacity-100 before:transition-opacity before:duration-300 ${className}`.trim();

  if (loading) {
    return (
      <div className={cardClasses}>
        <div className="h-10 bg-gray-200 rounded w-3/5 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto animate-pulse"></div>
      </div>
    );
  }

  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      // Format large numbers with commas
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div className={cardClasses}>
      <span className="block text-2xl sm:text-3xl font-primary font-light text-graphite mb-2">
        {prefix}{formatValue(value)}{suffix}
      </span>
      <div className="text-xs sm:text-sm font-primary text-warm-gray uppercase tracking-wider">{label}</div>
      {trend && (
        <div className={`mt-3 text-xs sm:text-sm font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
          {trend.label && ` ${trend.label}`}
        </div>
      )}
    </div>
  );
};

export default MetricCard; 