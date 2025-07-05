import React, { useState, useEffect } from 'react';
import ProductList from '../components/products/ProductList';
import ProductCard from '../components/ProductCard';

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
    <div className="min-h-screen bg-ivory">
      <div className="sticky top-[60px] z-40 bg-ivory border-b border-champagne/30">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={handleFilterToggle}
            className="flex items-center gap-2 bg-white border border-lavender/30 rounded-full text-sm 
              font-medium text-graphite px-4 py-2 min-h-[40px] shadow-sm hover:bg-lavender/5 
              active:scale-[0.97] transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-lavender">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Filters {hasActiveFilters && <span className="ml-1">({productCount})</span>}
          </button>

          <div className="relative">
            <button 
              onClick={toggleSortDropdown}
              className="flex items-center gap-2 bg-white border border-lavender/30 rounded-full text-sm 
                font-medium text-graphite px-4 py-2 min-h-[40px] shadow-sm hover:bg-lavender/5 
                transition-all duration-300"
            >
              {selectedSortLabel}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`transform transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {isSortDropdownOpen && (
              <ul className="absolute top-full right-0 mt-2 bg-white border border-lavender/10 rounded-xl 
                shadow-lg min-w-[200px] py-3 z-50">
                {sortOptions.map(option => (
                  <li 
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className="px-4 py-2 text-sm text-graphite hover:bg-lavender/5 hover:text-lavender 
                      cursor-pointer transition-colors duration-200"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Filter Drawer Backdrop */}
      {isFilterDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={handleCloseDrawer}
        />
      )}

      {/* Filter Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-white z-[60] transform 
          ${isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full'} 
          transition-transform duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-5 border-b border-champagne">
          <h2 className="text-2xl font-normal text-graphite">Filters</h2>
          <button 
            onClick={handleCloseDrawer}
            className="p-2 text-graphite hover:bg-lavender/10 rounded-full transition-colors duration-300"
            aria-label="Close filters"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 pb-24">
          {/* Metal Filter Section */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-graphite mb-4">Metal</h3>
            <div className="space-y-2">
              {['All', 'Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'].map((metal) => (
                <label key={metal} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="metal"
                    value={metal}
                    checked={tempMetalFilter === metal}
                    onChange={(e) => setTempMetalFilter(e.target.value)}
                    className="w-5 h-5 border-2 border-lavender/30 rounded-full checked:bg-blush 
                      checked:border-blush focus:ring-2 focus:ring-blush/20 transition-colors duration-200"
                  />
                  <span className="text-sm text-graphite group-hover:text-blush transition-colors duration-200">
                    {metal}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Shape Filter Section */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-graphite mb-4">Diamond Shape</h3>
            <div className="space-y-2">
              {['All', 'Round', 'Oval', 'Princess', 'Emerald', 'Pear', 'Cushion', 'Marquise'].map((shape) => (
                <label key={shape} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="shape"
                    value={shape}
                    checked={tempShapeFilter === shape}
                    onChange={(e) => setTempShapeFilter(e.target.value)}
                    className="w-5 h-5 border-2 border-lavender/30 rounded-full checked:bg-blush 
                      checked:border-blush focus:ring-2 focus:ring-blush/20 transition-colors duration-200"
                  />
                  <span className="text-sm text-graphite group-hover:text-blush transition-colors duration-200">
                    {shape}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-champagne">
          <div className="flex gap-3">
            {hasActiveFilters && (
              <button 
                onClick={handleClearFilters}
                className="flex-1 px-6 py-3 text-sm font-medium text-graphite border border-lavender/30 
                  rounded-full hover:bg-lavender/5 transition-all duration-300"
              >
                Clear All
              </button>
            )}
            <button 
              onClick={handleApplyFilters}
              disabled={!hasFilterChanges}
                              className="flex-1 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-full 
                hover:bg-blush disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Apply Filters {productCount > 0 && `(${productCount})`}
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <ProductList
        metalFilter={metalFilter}
        shapeFilter={shapeFilter}
        sortBy={sortBy}
        onProductCountChange={handleProductCountChange}
      >
        {/* In the product grid, map over your products and render <ProductCard product={product} /> */}
        {/* Adjust the product object to include id, name, imageUrl, videoUrl, isBestseller, reviewCount, rating, price, oldPrice as needed. */}
      </ProductList>
    </div>
  );
};

export default ProductsPage;
