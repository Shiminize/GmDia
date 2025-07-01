import React, { useState, useEffect } from 'react';
import ProductList from '../components/products/ProductList';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
  const [metalFilter, setMetalFilter] = useState<string>('All');
  const [shapeFilter, setShapeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [productCount, setProductCount] = useState<number>(0);

  const handleProductCountChange = (count: number) => {
    setProductCount(count);
  };

  const clearFilters = () => {
    setMetalFilter('All');
    setShapeFilter('All');
    setSortBy('featured');
  };

  const hasActiveFilters = metalFilter !== 'All' || shapeFilter !== 'All';

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
      <h1>Our Collections</h1>
          <p>Discover our exquisite collection of lab-grown diamond jewelry, where artistry meets sustainability.</p>
        </div>

        <div className="products-content">
          {/* Sidebar Filters */}
          <aside className="products-sidebar">
            <div className="filter-section">
              <h3>Metal</h3>
              <div className="filter-options">
                {['All', 'Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'].map((metal) => (
                  <div key={metal} className="filter-option">
                    <input
                      type="radio"
                      id={`metal-${metal}`}
                      name="metal"
                      value={metal}
                      checked={metalFilter === metal}
                      onChange={(e) => setMetalFilter(e.target.value)}
                    />
                    <label htmlFor={`metal-${metal}`}>{metal}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Diamond Shape</h3>
              <div className="filter-options">
                {['All', 'Round', 'Oval', 'Princess', 'Emerald', 'Pear', 'Cushion', 'Marquise'].map((shape) => (
                  <div key={shape} className="filter-option">
                    <input
                      type="radio"
                      id={`shape-${shape}`}
                      name="shape"
                      value={shape}
                      checked={shapeFilter === shape}
                      onChange={(e) => setShapeFilter(e.target.value)}
                    />
                    <label htmlFor={`shape-${shape}`}>{shape}</label>
                  </div>
                ))}
              </div>
        </div>

            {hasActiveFilters && (
              <div className="filter-section">
                <button
                  onClick={clearFilters}
                  style={{
                    background: 'none',
                    border: '1px solid var(--digital-lavender)',
                    color: 'var(--digital-lavender)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-pill)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                    width: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--digital-lavender)';
                    e.currentTarget.style.color = 'var(--pure-white)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = 'var(--digital-lavender)';
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </aside>

          {/* Main Products Area */}
          <main className="products-main">
            <div className="sort-controls">
              <div className="results-count">
                {productCount} {productCount === 1 ? 'product' : 'products'}
              </div>
              <div className="sort-dropdown">
                <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
                  <option value="newest">Newest First</option>
          </select>
              </div>
            </div>

            <ProductList 
              metalFilter={metalFilter} 
              shapeFilter={shapeFilter} 
              sortBy={sortBy}
              onProductCountChange={handleProductCountChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;