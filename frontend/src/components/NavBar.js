import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <header className="navbar">
      <img src={require('../images/logo.webp')} alt="Logo" className="navbar-logo" />
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Account</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </header>
  );
};

export default NavBar;
