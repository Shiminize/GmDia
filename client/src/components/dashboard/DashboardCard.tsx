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
  const cardClasses = `dashboard-card ${className} ${loading ? 'loading' : ''}`.trim();

  if (loading) {
    return (
      <div className={cardClasses}>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
      </div>
    );
  }

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard; 