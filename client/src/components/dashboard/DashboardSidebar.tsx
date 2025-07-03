import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

// Type cast the icons for proper usage
const FaUser = FaIcons.FaUser as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaShoppingBag = FaIcons.FaShoppingBag as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaHeart = FaIcons.FaHeart as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaCog = FaIcons.FaCog as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaChartLine = FaIcons.FaChartLine as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaPalette = FaIcons.FaPalette as unknown as React.FC<React.ComponentProps<'svg'>>;

interface DashboardSidebarProps {
  user: {
    name: string;
    email: string;
    initials: string;
    stats: {
      orders: number;
      designs: number;
      wishlist: number;
    };
  };
}

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<React.ComponentProps<'svg'>>;
  path?: string;
  onClick?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: FaChartLine,
      path: '/dashboard'
    },
    {
      id: 'account',
      label: 'Account',
      icon: FaUser,
      path: '/dashboard/account'
    },
    {
      id: 'orders',
      label: 'Order History',
      icon: FaShoppingBag,
      path: '/dashboard/orders'
    },
    {
      id: 'designs',
      label: 'Saved Designs',
      icon: FaPalette,
      path: '/dashboard/designs'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: FaHeart,
      path: '/dashboard/wishlist'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FaCog,
      path: '/dashboard/settings'
    }
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveSection(item.id);
    if (item.onClick) {
      item.onClick();
    }
  };

  const isActive = (itemId: string) => {
    if (location.pathname === '/dashboard' && itemId === 'overview') {
      return true;
    }
    return location.pathname.includes(itemId) || activeSection === itemId;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 h-fit sticky top-[100px] transition-all duration-300 
      hover:shadow-md animate-slideInLeft">
      {/* Profile Section */}
      <div className="text-center pb-8 border-b border-champagne mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lavender to-blush flex items-center 
          justify-center mx-auto mb-4 shadow-sm text-white text-2xl font-primary">
          {user.initials}
        </div>
        <h4 className="text-xl text-graphite mb-2 font-primary">{user.name}</h4>
        <p className="text-sm text-warm-gray mb-4">{user.email}</p>
        
        <div className="flex justify-around pt-4">
          <div className="text-center">
            <span className="block text-2xl font-medium text-graphite font-primary">{user.stats.orders}</span>
            <span className="text-xs text-warm-gray uppercase tracking-wider">Orders</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-medium text-graphite font-primary">{user.stats.designs}</span>
            <span className="text-xs text-warm-gray uppercase tracking-wider">Designs</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-medium text-graphite font-primary">{user.stats.wishlist}</span>
            <span className="text-xs text-warm-gray uppercase tracking-wider">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg text-graphite font-medium transition-all 
                    duration-300 hover:bg-champagne hover:translate-x-1 
                    ${isActive(item.id) ? 'bg-champagne translate-x-1' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              ) : (
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-graphite font-medium 
                    transition-all duration-300 hover:bg-champagne hover:translate-x-1 text-left
                    ${isActive(item.id) ? 'bg-champagne translate-x-1' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar; 