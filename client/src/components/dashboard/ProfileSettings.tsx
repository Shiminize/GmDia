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
      <div className="space-y-8">
        <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-champagne to-gray-100 
          rounded-xl border border-champagne">
          <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-champagne to-gray-100 
        rounded-xl border border-champagne">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lavender to-graphite 
            flex items-center justify-center text-white text-3xl font-bold border-3 border-white 
            shadow-lg">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <button 
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-lavender border-2 
              border-white flex items-center justify-center text-white hover:bg-lavender/90 
              transition-colors duration-200"
          >
            <FaCamera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1">
          <h3 className="m-0 font-primary text-graphite text-xl">
            {user.name}
          </h3>
          <p className="mt-1 text-warm-gray text-sm">
            {user.email}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          disabled={isSubmitting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium 
            transition-colors duration-200 ${
            isEditing
              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
              : 'border-champagne text-graphite hover:bg-champagne/10'
          }`}
        >
          {isEditing ? (
            <>
              <FaTimes className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <FaEdit className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-graphite">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-graphite mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  placeholder-warm-gray disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  placeholder-warm-gray disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  placeholder-warm-gray disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-graphite">Address Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-graphite mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.address?.street}
                onChange={(e) => handleInputChange('street', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  placeholder-warm-gray disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                placeholder="Enter your street address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.address?.city}
                onChange={(e) => handleInputChange('city', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  placeholder-warm-gray disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite mb-1">
                State
              </label>
              <input
                type="text"
                value={formData.address?.state}
                onChange={(e) => handleInputChange('state', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  placeholder-warm-gray disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                placeholder="Enter your state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.address?.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  placeholder-warm-gray disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                placeholder="Enter your ZIP code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite mb-1">
                Country
              </label>
              <select
                value={formData.address?.country}
                onChange={(e) => handleInputChange('country', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-champagne bg-white text-graphite 
                  disabled:bg-gray-50 disabled:text-warm-gray 
                  focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-graphite">Communication Preferences</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.preferences?.newsletter}
                onChange={(e) => handleInputChange('newsletter', e.target.checked, 'preferences')}
                disabled={!isEditing}
                className="w-5 h-5 rounded border-champagne text-lavender focus:ring-lavender 
                  disabled:opacity-50"
              />
              <span className="text-sm text-graphite">Subscribe to newsletter</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.preferences?.promotions}
                onChange={(e) => handleInputChange('promotions', e.target.checked, 'preferences')}
                disabled={!isEditing}
                className="w-5 h-5 rounded border-champagne text-lavender focus:ring-lavender 
                  disabled:opacity-50"
              />
              <span className="text-sm text-graphite">Receive promotional emails</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.preferences?.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked, 'preferences')}
                disabled={!isEditing}
                className="w-5 h-5 rounded border-champagne text-lavender focus:ring-lavender 
                  disabled:opacity-50"
              />
              <span className="text-sm text-graphite">Email notifications for orders and updates</span>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        {isEditing && (
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg border border-champagne text-graphite text-sm 
                font-medium hover:bg-champagne/10 transition-colors duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-lavender text-white text-sm font-medium 
                hover:bg-lavender/90 transition-colors duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSettings; 