import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import OrderTable from '../components/dashboard/OrderTable';
import StatusBadge from '../components/dashboard/StatusBadge';
import { FaSearch, FaCalendar, FaFilter } from 'react-icons/fa';
import './Dashboard.css';

import { StatusType } from '../components/dashboard/StatusBadge';

interface Order {
  id: string;
  date: string;
  total: number;
  status: StatusType;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shipping: {
    address: string;
    method: string;
    tracking?: string;
  };
}

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulate loading orders data
    const timer = setTimeout(() => {
      setOrders([
        {
          id: 'ORD-001',
          date: '2024-03-15',
          total: 2499.99,
          status: 'completed',
          items: [
            {
              id: 'ITEM-001',
              name: 'Diamond Solitaire Ring',
              quantity: 1,
              price: 2499.99,
              image: '/images/ring-1.jpg'
            }
          ],
          shipping: {
            address: '123 Main St, City, State 12345',
            method: 'Express',
            tracking: 'TRK123456789'
          }
        },
        {
          id: 'ORD-002',
          date: '2024-03-10',
          total: 3999.99,
          status: 'processing',
          items: [
            {
              id: 'ITEM-002',
              name: 'Sapphire Pendant',
              quantity: 1,
              price: 1999.99,
              image: '/images/pendant-1.jpg'
            },
            {
              id: 'ITEM-003',
              name: 'Diamond Earrings',
              quantity: 1,
              price: 2000.00,
              image: '/images/earrings-1.jpg'
            }
          ],
          shipping: {
            address: '456 Oak Ave, Town, State 67890',
            method: 'Standard',
            tracking: 'TRK987654321'
          }
        }
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    let matchesDate = true;
    const orderDate = new Date(order.date);
    const today = new Date();
    
    switch (dateFilter) {
      case 'last30':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        matchesDate = orderDate >= thirtyDaysAgo;
        break;
      case 'last90':
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);
        matchesDate = orderDate >= ninetyDaysAgo;
        break;
      case 'last365':
        const yearAgo = new Date();
        yearAgo.setDate(today.getDate() - 365);
        matchesDate = orderDate >= yearAgo;
        break;
      default:
        matchesDate = true;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  if (!user) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <DashboardCard title="Authentication Required">
            <p>Please log in to view your order history.</p>
          </DashboardCard>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-main fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Order History</h1>
        <p className="dashboard-subtitle">Track and manage your orders</p>
      </div>

      <DashboardCard>
        <div className="filters-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders by ID or item name..."
              value={searchTerm}
              onChange={handleSearch}
              className="luxury-input"
            />
          </div>

          <div className="filters-group">
            <div className="filter">
              <FaCalendar className="filter-icon" />
              <select
                value={dateFilter}
                onChange={handleDateFilterChange}
                className="luxury-select"
              >
                <option value="all">All Time</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="last365">Last Year</option>
              </select>
            </div>

            <div className="filter">
              <FaFilter className="filter-icon" />
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="luxury-select"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-skeleton">
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="shipping-info">
                    <h4>Shipping Details</h4>
                    <p>{order.shipping.address}</p>
                    <p>Method: {order.shipping.method}</p>
                    {order.shipping.tracking && (
                      <p>Tracking: {order.shipping.tracking}</p>
                    )}
                  </div>
                  <div className="order-total">
                    <h4>Total</h4>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <p>No orders found matching your criteria.</p>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default OrderHistory; 