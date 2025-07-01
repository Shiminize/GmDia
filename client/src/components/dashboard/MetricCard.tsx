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
  const cardClasses = `metric-card ${className}`.trim();

  if (loading) {
    return (
      <div className={cardClasses}>
        <div className="skeleton skeleton-title" style={{ height: '2.5rem', width: '60%', margin: '0 auto 0.5rem' }}></div>
        <div className="skeleton skeleton-text" style={{ height: '0.9rem', width: '80%', margin: '0 auto' }}></div>
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
      <span className="metric-value">
        {prefix}{formatValue(value)}{suffix}
      </span>
      <div className="metric-label">{label}</div>
      {trend && (
        <div className={`metric-trend ${trend.isPositive ? 'trend-up' : 'trend-down'}`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
          {trend.label && ` ${trend.label}`}
        </div>
      )}
    </div>
  );
};

export default MetricCard; 