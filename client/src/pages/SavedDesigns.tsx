import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import { FaMagnifyingGlass, FaPenToSquare, FaTrash, FaShare, FaCartShopping } from 'react-icons/fa6';
import './Dashboard.css';

interface Design {
  id: string;
  name: string;
  createdAt: string;
  preview: string;
  type: 'ring' | 'necklace' | 'earrings' | 'bracelet';
  specs: {
    metal: string;
    stones: Array<{
      type: string;
      size: string;
      color?: string;
      clarity?: string;
    }>;
    size?: string;
    style: string;
  };
  price: number;
  status: 'draft' | 'saved' | 'ordered';
}

const SavedDesigns: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    // Simulate loading designs data
    const timer = setTimeout(() => {
      setDesigns([
        {
          id: 'DSG-001',
          name: 'Classic Solitaire Ring',
          createdAt: '2024-03-15',
          preview: '/images/designs/ring-1.jpg',
          type: 'ring',
          specs: {
            metal: '18K White Gold',
            stones: [
              {
                type: 'Lab Diamond',
                size: '1.5ct',
                color: 'D',
                clarity: 'VS1'
              }
            ],
            size: '6.5',
            style: 'Solitaire'
          },
          price: 3999.99,
          status: 'saved'
        },
        {
          id: 'DSG-002',
          name: 'Sapphire Pendant',
          createdAt: '2024-03-10',
          preview: '/images/designs/pendant-1.jpg',
          type: 'necklace',
          specs: {
            metal: '14K Rose Gold',
            stones: [
              {
                type: 'Blue Sapphire',
                size: '1.2ct'
              },
              {
                type: 'Lab Diamond',
                size: '0.3ct',
                color: 'F',
                clarity: 'VS2'
              }
            ],
            style: 'Halo'
          },
          price: 2499.99,
          status: 'draft'
        }
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleDelete = async (designId: string) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      // Simulate API call
      setDesigns(prev => prev.filter(d => d.id !== designId));
    }
  };

  const handleEdit = (designId: string) => {
    window.location.href = `/customize?design=${designId}`;
  };

  const handleShare = (designId: string) => {
    // Implement share functionality
    alert('Share functionality coming soon!');
  };

  const handleAddToCart = (designId: string) => {
    // Implement add to cart functionality
    alert('Added to cart!');
  };

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || design.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (!user) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <DashboardCard title="Authentication Required">
            <p>Please log in to view your saved designs.</p>
          </DashboardCard>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-main fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Saved Designs</h1>
        <p className="dashboard-subtitle">Your custom jewelry creations</p>
      </div>

      <DashboardCard>
        <div className="filters-section">
          <div className="search-box">
            <FaMagnifyingGlass className="search-icon" />
            <input
              type="text"
              placeholder="Search designs by name or ID..."
              value={searchTerm}
              onChange={handleSearch}
              className="luxury-input"
            />
          </div>

          <div className="filters-group">
            <div className="filter">
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="luxury-select"
              >
                <option value="all">All Types</option>
                <option value="ring">Rings</option>
                <option value="necklace">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="bracelet">Bracelets</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="designs-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="design-card skeleton">
                <div className="design-image skeleton-image"></div>
                <div className="design-content">
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDesigns.length > 0 ? (
          <div className="designs-grid">
            {filteredDesigns.map(design => (
              <div key={design.id} className="design-card">
                <div className="design-image">
                  <img src={design.preview} alt={design.name} />
                  <div className="design-actions">
                    <button
                      onClick={() => handleEdit(design.id)}
                      className="action-button"
                      title="Edit Design"
                    >
                      <FaPenToSquare />
                    </button>
                    <button
                      onClick={() => handleShare(design.id)}
                      className="action-button"
                      title="Share Design"
                    >
                      <FaShare />
                    </button>
                    <button
                      onClick={() => handleDelete(design.id)}
                      className="action-button delete"
                      title="Delete Design"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="design-content">
                  <h3>{design.name}</h3>
                  <p className="design-id">Design #{design.id}</p>
                  <div className="design-specs">
                    <p>{design.specs.metal}</p>
                    <p>{design.specs.stones[0].type} - {design.specs.stones[0].size}</p>
                    {design.specs.size && <p>Size: {design.specs.size}</p>}
                  </div>
                  <div className="design-footer">
                    <span className="design-price">${design.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(design.id)}
                      className="cart-button"
                    >
                      <FaCartShopping /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-designs">
            <p>No designs found matching your criteria.</p>
            <a href="/customize" className="start-design-button">
              Start Designing
            </a>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default SavedDesigns; 