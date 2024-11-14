import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) onSearch(city);
  };

  return (
    <div>
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
      <button
        className={`search-button ${city ? 'show' : ''}`}
        onClick={handleSearch}
      >
      Search</button>
      </div>
  );
};

export default SearchBar;
