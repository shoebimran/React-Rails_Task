import React, { useState, useEffect } from 'react';
import LocationFetcher from './components/LocationFetcher';
import SearchBar from './components/SearchBar';
import BandList from './components/BandList';
import { fetchBandsByCity } from './services/musicBrainzService';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [bands, setBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchCity) => {
    setIsLoading(true); // Start the loader
    setTimeout(async () => {
      const fetchedBands = await fetchBandsByCity(searchCity);
      setBands(fetchedBands);
      setIsLoading(false); // Stop the loader
    }, 3000); // Simulate a 3-second delay
  };

  useEffect(() => {
    if (city) handleSearch(city);
  }, [city]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="title">🎶 Music Band Finder 🎶</h1>
        <p className="subtitle">Discover bands in your city!</p>
      </header>
      <div className="wrap">
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
      </div>
      <LocationFetcher setCity={setCity} />
      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading ? (
       <div class="container">
      <div class="loader">
     </div>
     </div>
      ) : (
        <BandList bands={bands} />
      )}
    </div>
  );
}

export default App;
