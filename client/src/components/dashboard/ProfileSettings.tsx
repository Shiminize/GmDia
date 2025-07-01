import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

// Type cast the icons
const FaUser = FaIcons.FaUser as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaEdit = FaIcons.FaEdit as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaSave = FaIcons.FaSave as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaTimes = FaIcons.FaTimes as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaCamera = FaIcons.FaCamera as unknown as React.FC<React.ComponentProps<'svg'>>;

interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  preferences?: {
    newsletter: boolean;
    promotions: boolean;
    emailNotifications: boolean;
  };
}

interface ProfileSettingsProps {
  user: User;
  onUpdateProfile?: (updatedUser: Partial<User>) => Promise<void>;
  loading?: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  user,
  onUpdateProfile,
  loading = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    ...user,
    phone: user.phone || '',
    address: {
      street: user.address?.street || '',
      city: user.address?.city || '',
      state: user.address?.state || '',
      zipCode: user.address?.zipCode || '',
      country: user.address?.country || 'United States'
    },
    preferences: {
      newsletter: user.preferences?.newsletter ?? true,
      promotions: user.preferences?.promotions ?? true,
      emailNotifications: user.preferences?.emailNotifications ?? true
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any, nested?: string) => {
    setFormData(prev => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...prev[nested as keyof User] as any,
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateProfile) return;

    setIsSubmitting(true);
    try {
      await onUpdateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      ...user,
      phone: user.phone || '',
      address: {
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || 'United States'
      },
      preferences: {
        newsletter: user.preferences?.newsletter ?? true,
        promotions: user.preferences?.promotions ?? true,
        emailNotifications: user.preferences?.emailNotifications ?? true
      }
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-settings">
        <div className="profile-header">
          <div className="skeleton skeleton-avatar"></div>
          <div style={{ flex: 1 }}>
            <div className="skeleton skeleton-text" style={{ width: '200px', marginBottom: '0.5rem' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '150px' }}></div>
          </div>
        </div>
        <div className="profile-form">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="form-group">
              <div className="skeleton skeleton-text" style={{ width: '100px', marginBottom: '0.5rem' }}></div>
              <div className="skeleton skeleton-text" style={{ height: '40px' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="profile-settings">
      {/* Profile Header */}
      <div className="profile-header" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, var(--champagne-beige) 0%, var(--light-gray) 100%)',
        borderRadius: 'var(--radius-large)',
        border: '1px solid var(--champagne-beige)'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--digital-lavender), var(--graphite-black))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--pure-white)',
            fontSize: '2rem',
            fontWeight: 'bold',
            border: '3px solid var(--pure-white)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <button 
            className="avatar-upload"
            style={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--digital-lavender)',
              border: '2px solid var(--pure-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--pure-white)',
              fontSize: '0.8rem'
            }}
          >
            <FaCamera />
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: 0,
            fontFamily: 'var(--font-primary)',
            color: 'var(--graphite-black)'
          }}>
            {user.name}
          </h3>
          <p style={{ 
            margin: '0.25rem 0 0',
            color: 'var(--warm-gray)',
            fontSize: '0.9rem'
          }}>
            {user.email}
          </p>
          <p style={{
            margin: '0.25rem 0 0',
            fontSize: '0.8rem',
            color: 'var(--digital-lavender)',
            fontWeight: '500'
          }}>
            {user.isAdmin ? 'Administrator' : 'Premium Member'} • Member since June 2024
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="card-action"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="profile-form">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Personal Information */}
          <div className="form-section">
            <h4 style={{ 
              margin: '0 0 1rem',
              color: 'var(--graphite-black)',
              fontFamily: 'var(--font-primary)'
            }}>
              Personal Information
            </h4>
            
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--graphite-black)'
              }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="luxury-input"
                  required
                />
              ) : (
                <p style={{ margin: 0, color: 'var(--warm-gray)' }}>{user.name}</p>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--graphite-black)'
              }}>
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="luxury-input"
                  required
                />
              ) : (
                <p style={{ margin: 0, color: 'var(--warm-gray)' }}>{user.email}</p>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--graphite-black)'
              }}>
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="luxury-input"
                  placeholder="(555) 123-4567"
                />
              ) : (
                <p style={{ margin: 0, color: 'var(--warm-gray)' }}>
                  {user.phone || 'Not provided'}
                </p>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="form-section">
            <h4 style={{ 
              margin: '0 0 1rem',
              color: 'var(--graphite-black)',
              fontFamily: 'var(--font-primary)'
            }}>
              Shipping Address
            </h4>
            
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--graphite-black)'
              }}>
                Street Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address?.street}
                  onChange={(e) => handleInputChange('street', e.target.value, 'address')}
                  className="luxury-input"
                  placeholder="123 Main Street"
                />
              ) : (
                <p style={{ margin: 0, color: 'var(--warm-gray)' }}>
                  {user.address?.street || 'Not provided'}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: 'var(--graphite-black)'
                }}>
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address?.city}
                    onChange={(e) => handleInputChange('city', e.target.value, 'address')}
                    className="luxury-input"
                    placeholder="New York"
                  />
                ) : (
                  <p style={{ margin: 0, color: 'var(--warm-gray)' }}>
                    {user.address?.city || 'Not provided'}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: 'var(--graphite-black)'
                }}>
                  State
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address?.state}
                    onChange={(e) => handleInputChange('state', e.target.value, 'address')}
                    className="luxury-input"
                    placeholder="NY"
                  />
                ) : (
                  <p style={{ margin: 0, color: 'var(--warm-gray)' }}>
                    {user.address?.state || 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="form-section" style={{ marginTop: '2rem' }}>
          <h4 style={{ 
            margin: '0 0 1rem',
            color: 'var(--graphite-black)',
            fontFamily: 'var(--font-primary)'
          }}>
            Communication Preferences
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { key: 'newsletter', label: 'Newsletter & Updates' },
              { key: 'promotions', label: 'Promotions & Offers' },
              { key: 'emailNotifications', label: 'Email Notifications' }
            ].map(pref => (
              <label key={pref.key} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: isEditing ? 'pointer' : 'default',
                padding: '1rem',
                background: 'var(--light-gray)',
                borderRadius: 'var(--radius-medium)',
                border: '1px solid var(--champagne-beige)'
              }}>
                <input
                  type="checkbox"
                  checked={formData.preferences?.[pref.key as keyof typeof formData.preferences]}
                  onChange={(e) => handleInputChange(pref.key, e.target.checked, 'preferences')}
                  disabled={!isEditing}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--digital-lavender)'
                  }}
                />
                <span style={{
                  fontWeight: '500',
                  color: 'var(--graphite-black)'
                }}>
                  {pref.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--light-gray)',
            borderRadius: 'var(--radius-medium)',
            border: '1px solid var(--champagne-beige)'
          }}>
            <button
              type="button"
              onClick={handleCancel}
              className="card-action"
              style={{
                background: 'var(--warm-gray)',
                color: 'var(--pure-white)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="card-action"
              style={{
                background: 'var(--digital-lavender)',
                color: 'var(--pure-white)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              <FaSave /> {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSettings; 