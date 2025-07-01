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
        return 'status-completed';
      case 'pending':
      case 'draft':
        return 'status-pending';
      case 'processing':
      case 'shipped':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
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

  const badgeClasses = `status-badge ${getStatusClass(status)} ${className}`.trim();

  return (
    <span className={badgeClasses}>
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge; 