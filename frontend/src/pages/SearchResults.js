import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get search query from URL
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/search?query=${query}`);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching search results.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div>Loading search results...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <h5>{product.name}</h5>
              <p>{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
