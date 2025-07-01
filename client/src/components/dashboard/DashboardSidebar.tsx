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
    <div className="dashboard-sidebar slide-in-left">
      {/* Profile Section */}
      <div className="sidebar-profile">
        <div className="profile-avatar">
          {user.initials}
        </div>
        <h4 className="profile-name">{user.name}</h4>
        <p className="profile-email">{user.email}</p>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{user.stats.orders}</span>
            <span className="stat-label">Orders</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.stats.designs}</span>
            <span className="stat-label">Designs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.stats.wishlist}</span>
            <span className="stat-label">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="nav-menu">
          {navigationItems.map((item) => (
            <li key={item.id} className="nav-item">
              {item.path ? (
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.id) ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  <item.icon className="nav-icon" />
                  {item.label}
                </Link>
              ) : (
                <button
                  className={`nav-link ${isActive(item.id) ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    width: '100%', 
                    textAlign: 'left' 
                  }}
                >
                  <item.icon className="nav-icon" />
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