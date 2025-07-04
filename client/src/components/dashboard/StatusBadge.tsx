import React from 'react';

export type StatusType = 'completed' | 'pending' | 'processing' | 'cancelled' | 'shipped' | 'delivered' | 'draft';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusClass = (status: StatusType): string => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
      case 'draft':
        return 'bg-amber-100 text-amber-700';
      case 'processing':
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusText = (status: StatusType): string => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  const badgeClasses = `inline-flex items-center min-h-[32px] px-3 py-1.5 rounded-full text-xs sm:text-sm font-primary font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 
    ${getStatusClass(status)} ${className}`.trim();

  return (
    <span className={badgeClasses}>
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge; 