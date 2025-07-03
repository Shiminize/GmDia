import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import DashboardCard from '../components/dashboard/DashboardCard';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import MetricCard from '../components/dashboard/MetricCard';
import StatusBadge, { StatusType } from '../components/dashboard/StatusBadge';
import OrderTable from '../components/dashboard/OrderTable';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMetrics(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ivory to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-8">
          <DashboardCard title="Authentication Required">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium text-graphite mb-4">Please log in to access your dashboard</h3>
              <Link to="/login">
                <button className="px-6 py-2 bg-champagne text-graphite text-sm font-medium uppercase tracking-wider 
                  rounded-full hover:bg-blush hover:text-white transition-all duration-300">
                  Go to Login
                </button>
              </Link>
            </div>
          </DashboardCard>
        </div>
      </div>
    );
  }

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
      wishlist: 5
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
    <div className="min-h-screen bg-gradient-to-br from-ivory to-gray-100 pt-20 flex animate-fadeIn">
      <div className="max-w-[1600px] w-full mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 
        min-h-[calc(100vh-80px)] relative">
        {/* Sidebar */}
        <DashboardSidebar user={userStats} />

        {/* Main Content */}
        <main>
          <div className="mb-8">
            <h1 className="text-4xl font-light text-graphite mb-2">Welcome back, {user.name}</h1>
            <p className="text-lg text-warm-gray">Here's what's happening with your jewelry collection</p>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Information */}
              <DashboardCard 
                title="Account Information"
                action={
                  <button className="px-4 py-2 bg-champagne text-graphite text-sm font-medium uppercase 
                    tracking-wider rounded-full hover:bg-blush hover:text-white transition-all duration-300">
                    Edit Profile
                  </button>
                }
              >
                <div className="space-y-3">
                  <p><span className="font-medium">Name:</span> {user.name}</p>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">Account Type:</span> {user.isAdmin ? 'Admin' : 'Premium Customer'}</p>
                  <p><span className="font-medium">Member Since:</span> June 2024</p>
                </div>
              </DashboardCard>

              {/* Order History */}
              <DashboardCard 
                title="Order History"
                action={
                  <Link to="/dashboard/orders" className="px-4 py-2 bg-champagne text-graphite text-sm font-medium 
                    uppercase tracking-wider rounded-full hover:bg-blush hover:text-white transition-all duration-300">
                    View All Orders
                  </Link>
                }
              >
                <OrderTable
                  orders={orderHistory}
                  loading={loadingMetrics}
                  itemsPerPage={5}
                  onViewOrder={(orderId) => {
                    console.log('Viewing order:', orderId);
                  }}
                />
              </DashboardCard>
            </div>

            {/* Saved Designs */}
            <DashboardCard 
              title="Saved Designs"
              action={
                <Link to="/design" className="px-4 py-2 bg-champagne text-graphite text-sm font-medium 
                  uppercase tracking-wider rounded-full hover:bg-blush hover:text-white transition-all duration-300">
                  Create New Design
                </Link>
              }
            >
              {loadingDesigns ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : savedDesigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedDesigns.map((design) => (
                    <div key={design._id} className="bg-white rounded-lg shadow-sm border border-champagne/30 
                      overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="aspect-square bg-gray-100 relative">
                        <img
                          src={`/design-previews/${design.designData.setting}.jpg`}
                          alt={design.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-graphite mb-2">{design.name}</h3>
                        <div className="text-sm text-warm-gray space-y-1">
                          <p>Setting: {design.designData.setting}</p>
                          <p>Metal: {design.designData.metal}</p>
                          <p>Shape: {design.designData.diamondShape}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <button 
                            onClick={() => handleDeleteDesign(design._id)}
                            className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
                          >
                            Delete
                          </button>
                          <Link
                            to={`/design/${design._id}`}
                            className="px-4 py-2 bg-graphite text-white text-sm font-medium rounded-full 
                              hover:bg-blush transition-all duration-300"
                          >
                            Edit Design
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-warm-gray mb-4">You haven't saved any designs yet.</p>
                  <Link
                    to="/design"
                    className="inline-flex items-center px-6 py-3 bg-graphite text-white text-sm font-medium 
                      rounded-full hover:bg-blush transition-all duration-300"
                  >
                    Start Designing
                  </Link>
                </div>
              )}
            </DashboardCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;