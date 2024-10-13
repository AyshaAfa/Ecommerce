import React from 'react';

const AppSidebar = () => {
  return (
    <div className="sidebar">
      <h5>Filters</h5>
      <div className="filter-group">
        <h6>Categories</h6>
        <ul>
          <li>Beauty and Grooming</li>
          <li>Body & Face Care</li>
          <li>Hair Removal</li>
          <li>Anti Aging</li>
          
        </ul>
      </div>
      <div className="filter-group">
        <h6>Price</h6>
        <input type="range" min="100" max="1000" />
      </div>
    </div>
  );
};

export default AppSidebar;
