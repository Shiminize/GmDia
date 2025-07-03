import React, { useState, useMemo } from 'react';
import StatusBadge, { StatusType } from './StatusBadge';
import * as FaIcons from 'react-icons/fa';

// Type cast the icons
const FaSort = FaIcons.FaSort as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaSortUp = FaIcons.FaSortUp as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaSortDown = FaIcons.FaSortDown as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaChevronLeft = FaIcons.FaChevronLeft as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaChevronRight = FaIcons.FaChevronRight as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaEye = FaIcons.FaEye as unknown as React.FC<React.ComponentProps<'svg'>>;

interface Order {
  id: string;
  date: string;
  total: number;
  status: StatusType;
  items: string[];
  customer?: string;
}

interface OrderTableProps {
  orders: Order[];
  loading?: boolean;
  showCustomer?: boolean;
  onViewOrder?: (orderId: string) => void;
  itemsPerPage?: number;
}

type SortField = 'id' | 'date' | 'total' | 'status';
type SortDirection = 'asc' | 'desc';

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  loading = false,
  showCustomer = false,
  onViewOrder,
  itemsPerPage = 10
}) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<StatusType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting and filtering logic
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === 'total') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [orders, statusFilter, sortField, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="w-3 h-3 text-warm-gray" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="w-3 h-3 text-graphite" /> : 
      <FaSortDown className="w-3 h-3 text-graphite" />;
  };

  const getStatusOptions = (): StatusType[] => {
    const statusSet = new Set(orders.map(order => order.status));
    return Array.from(statusSet) as StatusType[];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div></th>
              <th className="p-4"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div></th>
              <th className="p-4"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div></th>
              <th className="p-4"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div></th>
              <th className="p-4"><div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="p-4"><div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-4"><div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-4"><div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-4"><div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-4"><div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-graphite">
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StatusType | 'all');
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-champagne bg-white text-sm focus:outline-none 
              focus:ring-2 focus:ring-champagne focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {getStatusOptions().map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-warm-gray">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('id')}
                className="p-4 text-left text-sm font-medium text-graphite border-b border-champagne/30 
                  cursor-pointer select-none hover:bg-champagne/5"
              >
                <div className="flex items-center gap-2">
                  Order ID {getSortIcon('id')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('date')}
                className="p-4 text-left text-sm font-medium text-graphite border-b border-champagne/30 
                  cursor-pointer select-none hover:bg-champagne/5"
              >
                <div className="flex items-center gap-2">
                  Date {getSortIcon('date')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('total')}
                className="p-4 text-left text-sm font-medium text-graphite border-b border-champagne/30 
                  cursor-pointer select-none hover:bg-champagne/5"
              >
                <div className="flex items-center gap-2">
                  Total {getSortIcon('total')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('status')}
                className="p-4 text-left text-sm font-medium text-graphite border-b border-champagne/30 
                  cursor-pointer select-none hover:bg-champagne/5"
              >
                <div className="flex items-center gap-2">
                  Status {getSortIcon('status')}
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-graphite border-b border-champagne/30">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr 
                key={order.id}
                className="hover:bg-champagne/5 transition-colors duration-150"
              >
                <td className="p-4 text-sm text-graphite border-b border-champagne/30">
                  #{order.id}
                </td>
                <td className="p-4 text-sm text-graphite border-b border-champagne/30">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-sm text-graphite border-b border-champagne/30">
                  ${order.total.toLocaleString()}
                </td>
                <td className="p-4 text-sm border-b border-champagne/30">
                  <StatusBadge status={order.status} />
                </td>
                <td className="p-4 text-sm border-b border-champagne/30">
                  {onViewOrder && (
                    <button
                      onClick={() => onViewOrder(order.id)}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-graphite 
                        bg-champagne rounded-full hover:bg-blush hover:text-white transition-colors duration-200"
                    >
                      <FaEye className="w-3 h-3" />
                      View Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-graphite bg-white 
              rounded-lg border border-champagne disabled:opacity-50 disabled:cursor-not-allowed 
              hover:bg-champagne/10 transition-colors duration-200"
          >
            <FaChevronLeft className="w-3 h-3" />
            Previous
          </button>
          <div className="text-sm text-warm-gray">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-graphite bg-white 
              rounded-lg border border-champagne disabled:opacity-50 disabled:cursor-not-allowed 
              hover:bg-champagne/10 transition-colors duration-200"
          >
            Next
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTable; 