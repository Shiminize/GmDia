import React, { useState, useEffect } from 'react';
import ProductList from '../components/products/ProductList';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
  // State for active filters
  const [metalFilter, setMetalFilter] = useState<string>('All');
  const [shapeFilter, setShapeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [productCount, setProductCount] = useState<number>(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  // Temporary state for filters while drawer is open
  const [tempMetalFilter, setTempMetalFilter] = useState<string>('All');
  const [tempShapeFilter, setTempShapeFilter] = useState<string>('All');

  // Initialize temp filters when drawer opens
  useEffect(() => {
    if (isFilterDrawerOpen) {
      setTempMetalFilter(metalFilter);
      setTempShapeFilter(shapeFilter);
    }
  }, [isFilterDrawerOpen, metalFilter, shapeFilter]);

  // Prevent body scroll when filter drawer is open
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterDrawerOpen]);

  const handleFilterToggle = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsFilterDrawerOpen(false);
    // Reset temp filters to current active filters
    setTempMetalFilter(metalFilter);
    setTempShapeFilter(shapeFilter);
  };

  const handleApplyFilters = () => {
    // Apply temporary filters to active filters
    setMetalFilter(tempMetalFilter);
    setShapeFilter(tempShapeFilter);
    setIsFilterDrawerOpen(false);
  };

  const handleClearFilters = () => {
    setTempMetalFilter('All');
    setTempShapeFilter('All');
  };

  const handleProductCountChange = (count: number) => {
    setProductCount(count);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortSelect = (sortValue: string) => {
    setSortBy(sortValue);
    setIsSortDropdownOpen(false);
  };

  const hasActiveFilters = tempMetalFilter !== 'All' || tempShapeFilter !== 'All';
  const hasFilterChanges = tempMetalFilter !== metalFilter || tempShapeFilter !== shapeFilter;

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const selectedSortLabel = sortOptions.find(option => option.value === sortBy)?.label;

  return (
    <div className="products-page">
      <div className="sticky-filter-bar">
        <div className="mobile-filter-controls">
          <button className="filter-toggle-btn" onClick={handleFilterToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Filters {hasActiveFilters && <span className="filter-count">({productCount})</span>}
          </button>
          <div className="custom-sort-dropdown">
            <button className="sort-select-button" onClick={toggleSortDropdown}>
              {selectedSortLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {isSortDropdownOpen && (
              <ul className="sort-options">
                {sortOptions.map(option => (
                  <li key={option.value} className="sort-option" onClick={() => handleSortSelect(option.value)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="filter-drawer-backdrop" onClick={handleCloseDrawer} />
      )}
      <div className={`filter-drawer ${isFilterDrawerOpen ? 'open' : ''}`}>
        <div className="filter-drawer-header">
          <h2>Filters</h2>
          <button className="filter-drawer-close" onClick={handleCloseDrawer} aria-label="Close filters">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <div className="filter-drawer-content">
          {/* Metal Filter Section */}
          <div className="filter-section">
            <h3>Metal</h3>
            <div className="filter-options">
              {['All', 'Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'].map((metal) => (
                <label key={metal} className="filter-option">
                  <input
                    type="radio"
                    name="metal"
                    value={metal}
                    checked={tempMetalFilter === metal}
                    onChange={(e) => setTempMetalFilter(e.target.value)}
                  />
                  {metal}
                </label>
              ))}
            </div>
          </div>

          {/* Shape Filter Section */}
          <div className="filter-section">
            <h3>Diamond Shape</h3>
            <div className="filter-options">
              {['All', 'Round', 'Oval', 'Princess', 'Emerald', 'Pear', 'Cushion', 'Marquise'].map((shape) => (
                <label key={shape} className="filter-option">
                  <input
                    type="radio"
                    name="shape"
                    value={shape}
                    checked={tempShapeFilter === shape}
                    onChange={(e) => setTempShapeFilter(e.target.value)}
                  />
                  {shape}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-drawer-footer">
          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear All
            </button>
          )}
          <button 
            className="apply-filters-btn" 
            onClick={handleApplyFilters}
            disabled={!hasFilterChanges}
          >
            Apply Filters {productCount > 0 && `(${productCount})`}
          </button>
        </div>
      </div>

      {/* Product List */}
      <ProductList
        metalFilter={metalFilter}
        shapeFilter={shapeFilter}
        sortBy={sortBy}
        onProductCountChange={handleProductCountChange}
      />
    </div>
  );
};

export default ProductsPage;
