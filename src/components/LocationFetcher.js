import React, { useState } from 'react';
import { fetchGeoLocation } from '../services/geoLocationService';

const LocationFetcher = ({ setCity }) => {
  const [locationPrompted, setLocationPrompted] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const city = data.address?.city || '';
            setCity(city);
            setLocationStatus(`Location: ${city}`);
          } catch (error) {
            console.error("Error fetching city name:", error);
            setLocationStatus("Error fetching location.");
          }
        },
        async () => {
          const geoData = await fetchGeoLocation();
          if (geoData && geoData.city) {
            setCity(geoData.city);
            setLocationStatus(`Location: ${geoData.city}`);
          } else {
            setLocationStatus("Location not available.");
          }
        }
      );
    } else {
      fetchGeoLocation().then((geoData) => {
        if (geoData && geoData.city) {
          setCity(geoData.city);
          setLocationStatus(`Location: ${geoData.city}`);
        } else {
          setLocationStatus("Location not available.");
        }
      });
    }

    setLocationPrompted(true);
  };

  return (
    <div>
      {!locationPrompted ? (
        <button onClick={handleRequestLocation}>Allow Location Access</button>
      ) : (
        <p>{locationStatus || "Fetching location..."}</p>
      )}
    </div>
  );
};

export default LocationFetcher;
