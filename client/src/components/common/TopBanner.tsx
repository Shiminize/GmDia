import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopBanner.css';

interface BannerConfig {
  id: string;
  text: string;
  isActive: boolean;
  backgroundColor: string;
  textColor: string;
  linkUrl?: string;
  linkText?: string;
  priority: number;
}

interface TopBannerProps {
  isAdmin?: boolean;
}

const TopBanner: React.FC<TopBannerProps> = ({ isAdmin = false }) => {
  const [banners, setBanners] = useState<BannerConfig[]>([]);
  const [activeBanner, setActiveBanner] = useState<BannerConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<BannerConfig>>({});

  // Default banners
  const defaultBanners: BannerConfig[] = [
    {
      id: '1',
      text: 'Free shipping on orders over $300! 🎄 Holiday Sale - Up to 40% Off Lab Diamonds',
      isActive: true,
      backgroundColor: 'linear-gradient(270deg, #667eea, #764ba2, #F7E7CE, #764ba2, #667eea)',
      textColor: '#2a2a2a',
      linkUrl: '/products',
      linkText: '',
      priority: 1
    },
    {
      id: '2',
      text: '🎉 Limited Time: Free Ring Sizing & Complimentary Gift Wrapping',
      isActive: false,
      backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: '#ffffff',
      linkUrl: '/contact',
      linkText: 'Learn More',
      priority: 2
    },
    {
      id: '3',
      text: '💎 Expert Consultation Available - Design Your Dream Ring Today',
      isActive: false,
      backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: '#ffffff',
      linkUrl: '/customization',
      linkText: 'Start Designing',
      priority: 3
    }
  ];

  useEffect(() => {
    // Load banners from localStorage or use defaults
    const savedBanners = localStorage.getItem('topBanners');
    if (savedBanners) {
      setBanners(JSON.parse(savedBanners));
    } else {
      setBanners(defaultBanners);
      localStorage.setItem('topBanners', JSON.stringify(defaultBanners));
    }
  }, []);

  useEffect(() => {
    // Set the active banner (highest priority active banner)
    const active = banners
      .filter(banner => banner.isActive)
      .sort((a, b) => a.priority - b.priority)[0] || null;
    setActiveBanner(active);
  }, [banners]);

  const saveBanners = (newBanners: BannerConfig[]) => {
    setBanners(newBanners);
    localStorage.setItem('topBanners', JSON.stringify(newBanners));
  };

  const toggleBanner = (id: string) => {
    const newBanners = banners.map(banner =>
      banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
    );
    saveBanners(newBanners);
  };

  const updateBanner = (id: string, updates: Partial<BannerConfig>) => {
    const newBanners = banners.map(banner =>
      banner.id === id ? { ...banner, ...updates } : banner
    );
    saveBanners(newBanners);
  };

  const startEditing = (banner: BannerConfig) => {
    setEditForm(banner);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (editForm.id) {
      updateBanner(editForm.id, editForm);
      setIsEditing(false);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const addNewBanner = () => {
    const newBanner: BannerConfig = {
      id: Date.now().toString(),
      text: 'New banner message',
      isActive: false,
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      priority: banners.length + 1
    };
    saveBanners([...banners, newBanner]);
  };

  const deleteBanner = (id: string) => {
    const newBanners = banners.filter(banner => banner.id !== id);
    saveBanners(newBanners);
  };

  if (!activeBanner && !isAdmin) {
    return null;
  }

  return (
    <div className="top-banner-container">
      {activeBanner && (
        <>
          {activeBanner.linkUrl ? (
            <Link 
              to={activeBanner.linkUrl}
              className="top-banner-link"
              style={{ color: activeBanner.textColor }}
            >
              <div 
                className="top-banner"
                style={{ color: activeBanner.textColor }}
              >
                <div className="banner-content">
                  <span className="banner-text">{activeBanner.text}</span>
                </div>
              </div>
            </Link>
          ) : (
            <div 
              className="top-banner"
              style={{ color: activeBanner.textColor }}
            >
              <div className="banner-content">
                <span className="banner-text">{activeBanner.text}</span>
              </div>
            </div>
          )}
        </>
      )}

      {isAdmin && (
        <div className="banner-admin-panel">
          <div className="admin-header">
            <h3>Banner Management</h3>
            <button onClick={addNewBanner} className="btn-add-banner">
              + Add Banner
            </button>
          </div>

          <div className="banner-list">
            {banners.map(banner => (
              <div key={banner.id} className="banner-item">
                <div className="banner-preview" style={{ background: banner.backgroundColor }}>
                  <span style={{ color: banner.textColor }}>{banner.text}</span>
                </div>
                <div className="banner-controls">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={banner.isActive}
                      onChange={() => toggleBanner(banner.id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <button onClick={() => startEditing(banner)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => deleteBanner(banner.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="edit-modal">
              <div className="edit-form">
                <h4>Edit Banner</h4>
                <div className="form-group">
                  <label>Banner Text:</label>
                  <input
                    type="text"
                    value={editForm.text || ''}
                    onChange={(e) => setEditForm({...editForm, text: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Background Color/Gradient:</label>
                  <input
                    type="text"
                    value={editForm.backgroundColor || ''}
                    onChange={(e) => setEditForm({...editForm, backgroundColor: e.target.value})}
                    placeholder="e.g., linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  />
                </div>
                <div className="form-group">
                  <label>Text Color:</label>
                  <input
                    type="color"
                    value={editForm.textColor || '#ffffff'}
                    onChange={(e) => setEditForm({...editForm, textColor: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Link URL (optional):</label>
                  <input
                    type="text"
                    value={editForm.linkUrl || ''}
                    onChange={(e) => setEditForm({...editForm, linkUrl: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Link Text (optional):</label>
                  <input
                    type="text"
                    value={editForm.linkText || ''}
                    onChange={(e) => setEditForm({...editForm, linkText: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Priority (lower = higher priority):</label>
                  <input
                    type="number"
                    value={editForm.priority || 1}
                    onChange={(e) => setEditForm({...editForm, priority: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-actions">
                  <button onClick={saveEdit} className="btn-save">Save</button>
                  <button onClick={cancelEdit} className="btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopBanner; 