import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import DashboardCard from '../components/dashboard/DashboardCard';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import MetricCard from '../components/dashboard/MetricCard';
import StatusBadge, { StatusType } from '../components/dashboard/StatusBadge';
import './Dashboard.css';

interface SavedDesign {
  _id: string;
  name: string;
  designData: {
    setting: string;
    metal: string;
    diamondShape: string;
    engraving: string;
  };
  createdAt: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: StatusType;
  items: string[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [loadingDesigns, setLoadingDesigns] = useState(false);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // Load saved designs
  useEffect(() => {
    const loadSavedDesigns = async () => {
      if (!user) return;
      
      setLoadingDesigns(true);
      try {
        const designs = await api.customDesigns.getMyDesigns(user.token);
        setSavedDesigns(designs);
      } catch (error) {
        console.error('Error loading saved designs:', error);
      } finally {
        setLoadingDesigns(false);
      }
    };

    loadSavedDesigns();
  }, [user]);

  // Simulate loading metrics
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMetrics(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <DashboardCard title="Authentication Required">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Please log in to access your dashboard</h3>
              <Link to="/login">
                <button className="card-action" style={{ marginTop: '1rem' }}>
                  Go to Login
                </button>
              </Link>
            </div>
          </DashboardCard>
        </div>
      </div>
    );
  }

  // Mock data - in real app, this would come from API
  const orderHistory: Order[] = [
    { id: 'ORD001', date: '2025-06-20', total: 1500, status: 'delivered', items: ['Classic Solitaire Ring'] },
    { id: 'ORD002', date: '2025-06-25', total: 2200, status: 'processing', items: ['Custom Emerald Necklace', 'Diamond Tennis Bracelet'] },
    { id: 'ORD003', date: '2025-06-15', total: 850, status: 'completed', items: ['Pearl Earrings'] },
  ];

  const userStats = {
    name: user.name,
    email: user.email,
    initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    stats: {
      orders: orderHistory.length,
      designs: savedDesigns.length,
      wishlist: 5 // Mock data
    }
  };

  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);
  const recentOrders = orderHistory.slice(0, 3);

  const handleDeleteDesign = async (designId: string) => {
    if (!user) return;
    
    try {
      await api.customDesigns.deleteDesign(designId, user.token);
      setSavedDesigns(prev => prev.filter(design => design._id !== designId));
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-container">
        {/* Sidebar */}
        <DashboardSidebar user={userStats} />

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Welcome back, {user.name}</h1>
            <p className="dashboard-subtitle">Here's what's happening with your jewelry collection</p>
          </div>

          {/* Metrics Overview */}
          <div className="metrics-grid">
            <MetricCard
              value={totalSpent}
              label="Total Spent"
              prefix="$"
              trend={{ value: 12, isPositive: true, label: 'this month' }}
              loading={loadingMetrics}
            />
            <MetricCard
              value={orderHistory.length}
              label="Total Orders"
              trend={{ value: 25, isPositive: true }}
              loading={loadingMetrics}
            />
            <MetricCard
              value={savedDesigns.length}
              label="Saved Designs"
              loading={loadingMetrics}
            />
            <MetricCard
              value={5}
              label="Wishlist Items"
              trend={{ value: 8, isPositive: false }}
              loading={loadingMetrics}
            />
          </div>

          {/* Content Sections */}
          <div className="content-section">
            <div className="section-grid">
              
              {/* Account Information */}
              <DashboardCard 
                title="Account Information"
                action={
                  <button className="card-action">Edit Profile</button>
                }
              >
                <div style={{ marginBottom: '1rem' }}>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Account Type:</strong> {user.isAdmin ? 'Admin' : 'Premium Customer'}</p>
                  <p><strong>Member Since:</strong> June 2024</p>
                </div>
              </DashboardCard>

              {/* Recent Orders */}
              <DashboardCard 
                title="Recent Orders"
                action={
                  <Link to="/dashboard/orders" className="card-action">View All</Link>
                }
              >
                {recentOrders.length > 0 ? (
                  <table className="luxury-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{new Date(order.date).toLocaleDateString()}</td>
                          <td>${order.total.toLocaleString()}</td>
                          <td><StatusBadge status={order.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: 'var(--warm-gray)', textAlign: 'center', padding: '2rem' }}>
                    No orders yet. Start exploring our collection!
                  </p>
                )}
              </DashboardCard>
            </div>
          </div>

          {/* Saved Designs */}
          <DashboardCard 
            title="Saved Designs"
            action={
              <Link to="/customize" className="card-action">Create New</Link>
            }
            loading={loadingDesigns}
          >
            {savedDesigns.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '1.5rem',
                marginTop: '1rem'
              }}>
                {savedDesigns.map(design => (
                  <div key={design._id} style={{
                    background: 'var(--light-gray)',
                    borderRadius: 'var(--radius-medium)',
                    padding: '1.5rem',
                    border: '1px solid var(--champagne-beige)'
                  }}>
                    <h4 style={{ 
                      fontFamily: 'var(--font-primary)', 
                      marginBottom: '1rem',
                      color: 'var(--graphite-black)'
                    }}>
                      {design.name}
                    </h4>
                    <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                      <p><strong>Setting:</strong> {design.designData.setting || 'Not specified'}</p>
                      <p><strong>Metal:</strong> {design.designData.metal || 'Not specified'}</p>
                      <p><strong>Diamond:</strong> {design.designData.diamondShape || 'Not specified'}</p>
                      {design.designData.engraving && (
                        <p><strong>Engraving:</strong> "{design.designData.engraving}"</p>
                      )}
                      <p><strong>Created:</strong> {new Date(design.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem',
                      justifyContent: 'flex-start'
                    }}>
                      <Link to={`/customize?loadDesign=${design._id}`}>
                        <button className="card-action" style={{ fontSize: '0.8rem' }}>
                          Load Design
                        </button>
                      </Link>
                      <button 
                        className="card-action"
                        style={{ 
                          fontSize: '0.8rem',
                          background: 'var(--error-color)',
                          color: 'var(--pure-white)'
                        }}
                        onClick={() => handleDeleteDesign(design._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--warm-gray)' }}>
                <h4>No saved designs yet</h4>
                <p>Start customizing your perfect piece of jewelry!</p>
                <Link to="/customize">
                  <button className="card-action" style={{ marginTop: '1rem' }}>
                    Create Your First Design
                  </button>
                </Link>
              </div>
            )}
          </DashboardCard>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;