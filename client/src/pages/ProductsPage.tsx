import React, { useState } from 'react';
import ProductList from '../components/products/ProductList';

const ProductsPage: React.FC = () => {
  const [metalFilter, setMetalFilter] = useState<string>('All');
  const [shapeFilter, setShapeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('price-asc');

  return (
    <div className="products-page">
      <h1>Our Collections</h1>
      <p>Explore our exquisite collection of lab-grown diamond jewelry.</p>

      <div className="filters-sort-controls">
        <div className="filter-group">
          <label htmlFor="metal-filter">Metal:</label>
          <select id="metal-filter" value={metalFilter} onChange={(e) => setMetalFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Yellow Gold">Yellow Gold</option>
            <option value="White Gold">White Gold</option>
            <option value="Rose Gold">Rose Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="shape-filter">Diamond Shape:</label>
          <select id="shape-filter" value={shapeFilter} onChange={(e) => setShapeFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Round">Round</option>
            <option value="Oval">Oval</option>
            <option value="Princess">Princess</option>
            <option value="Emerald">Emerald</option>
            <option value="Pear">Pear</option>
          </select>
        </div>

        <div className="sort-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>

      <ProductList metalFilter={metalFilter} shapeFilter={shapeFilter} sortBy={sortBy} />
    </div>
  );
};

export default ProductsPage;