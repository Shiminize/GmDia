import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBell } from 'react-icons/fa';
import './Dashboard.css';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    newsletter: boolean;
    orderUpdates: boolean;
    promotions: boolean;
  };
}

const AccountSettings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    preferences: {
      newsletter: true,
      orderUpdates: true,
      promotions: false
    }
  });

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setProfile(prev => {
        const sectionKey = section as keyof UserProfile;
        const sectionValue = prev[sectionKey];
        
        if (typeof sectionValue === 'object' && sectionValue !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionValue,
              [field]: type === 'checkbox' ? checked : value
            }
          };
        }
        return prev;
      });
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaving(false);
  };

  if (!user) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <DashboardCard title="Authentication Required">
            <p>Please log in to access your account settings.</p>
          </DashboardCard>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-main fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Account Settings</h1>
        <p className="dashboard-subtitle">Manage your profile and preferences</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <DashboardCard 
          title="Personal Information"
          action={
            <button 
              type="submit" 
              className="card-action"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          }
        >
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="name">
                <FaUser className="form-icon" /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="luxury-input"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="form-icon" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="luxury-input"
                value={profile.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone className="form-icon" /> Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="luxury-input"
                value={profile.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </DashboardCard>

        {/* Address Information */}
        <DashboardCard title="Shipping Address">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="street">
                <FaMapMarkerAlt className="form-icon" /> Street Address
              </label>
              <input
                type="text"
                id="street"
                name="address.street"
                className="luxury-input"
                value={profile.address.street}
                onChange={handleInputChange}
                placeholder="Enter your street address"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="address.city"
                  className="luxury-input"
                  value={profile.address.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input
                  type="text"
                  id="state"
                  name="address.state"
                  className="luxury-input"
                  value={profile.address.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="address.zipCode"
                  className="luxury-input"
                  value={profile.address.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter ZIP code"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="address.country"
                  className="luxury-input"
                  value={profile.address.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Notification Preferences */}
        <DashboardCard title="Notification Preferences">
          <div className="form-section">
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="preferences.newsletter"
                  checked={profile.preferences.newsletter}
                  onChange={handleInputChange}
                />
                <FaBell className="form-icon" />
                <span>
                  Newsletter
                  <small>Receive our monthly newsletter with exclusive offers</small>
                </span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="preferences.orderUpdates"
                  checked={profile.preferences.orderUpdates}
                  onChange={handleInputChange}
                />
                <FaBell className="form-icon" />
                <span>
                  Order Updates
                  <small>Get notifications about your order status</small>
                </span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="preferences.promotions"
                  checked={profile.preferences.promotions}
                  onChange={handleInputChange}
                />
                <FaBell className="form-icon" />
                <span>
                  Promotional Offers
                  <small>Stay updated with special deals and promotions</small>
                </span>
              </label>
            </div>
          </div>
        </DashboardCard>
      </form>
    </div>
  );
};

export default AccountSettings; 