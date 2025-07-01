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
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const getStatusOptions = (): StatusType[] => {
    const statusSet = new Set(orders.map(order => order.status));
    return Array.from(statusSet) as StatusType[];
  };

  if (loading) {
    return (
      <div className="order-table-container">
        <div className="table-controls">
          <div className="skeleton skeleton-text" style={{ width: '200px', height: '40px' }}></div>
        </div>
        <table className="luxury-table">
          <thead>
            <tr>
              <th><div className="skeleton skeleton-text" style={{ width: '80px' }}></div></th>
              <th><div className="skeleton skeleton-text" style={{ width: '100px' }}></div></th>
              <th><div className="skeleton skeleton-text" style={{ width: '80px' }}></div></th>
              <th><div className="skeleton skeleton-text" style={{ width: '80px' }}></div></th>
              <th><div className="skeleton skeleton-text" style={{ width: '120px' }}></div></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td><div className="skeleton skeleton-text"></div></td>
                <td><div className="skeleton skeleton-text"></div></td>
                <td><div className="skeleton skeleton-text"></div></td>
                <td><div className="skeleton skeleton-text"></div></td>
                <td><div className="skeleton skeleton-text"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="order-table-container">
      {/* Controls */}
      <div className="table-controls" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ 
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--graphite-black)'
          }}>
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StatusType | 'all');
              setCurrentPage(1);
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-medium)',
              border: '1px solid var(--champagne-beige)',
              background: 'var(--pure-white)',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">All Statuses</option>
            {getStatusOptions().map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ 
          fontSize: '0.9rem',
          color: 'var(--warm-gray)'
        }}>
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
        </div>
      </div>

      {/* Table */}
      <table className="luxury-table">
        <thead>
          <tr>
            <th 
              onClick={() => handleSort('id')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Order ID {getSortIcon('id')}
              </div>
            </th>
            <th 
              onClick={() => handleSort('date')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Date {getSortIcon('date')}
              </div>
            </th>
            <th 
              onClick={() => handleSort('total')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Total {getSortIcon('total')}
              </div>
            </th>
            <th 
              onClick={() => handleSort('status')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Status {getSortIcon('status')}
              </div>
            </th>
            <th>Items</th>
            {onViewOrder && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontFamily: 'var(--font-secondary)', fontWeight: '500' }}>
                  {order.id}
                </td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td style={{ fontWeight: '500' }}>
                  ${order.total.toLocaleString()}
                </td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td style={{ fontSize: '0.9rem', color: 'var(--warm-gray)' }}>
                  {order.items.length > 2 
                    ? `${order.items.slice(0, 2).join(', ')} +${order.items.length - 2} more`
                    : order.items.join(', ')
                  }
                </td>
                {onViewOrder && (
                  <td>
                    <button
                      onClick={() => onViewOrder(order.id)}
                      className="card-action"
                      style={{ 
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={onViewOrder ? 6 : 5}
                style={{ 
                  textAlign: 'center', 
                  padding: '3rem',
                  color: 'var(--warm-gray)'
                }}
              >
                No orders found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem',
          padding: '1rem'
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="card-action"
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <FaChevronLeft />
          </button>
          
          <span style={{ 
            fontSize: '0.9rem',
            color: 'var(--graphite-black)',
            fontWeight: '500'
          }}>
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="card-action"
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTable; 