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
    <button onClick={handleRequestLocation} className="btn_location">
      <svg
        fill="#ffffff"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 395.71 395.71"
        xmlSpace="preserve"
      >
        <g>
          <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
        </g>
      </svg>
      Allow Location Access
    </button>
  ) : (
    <div className="fetching-location">
      <svg
        fill="#ffffff"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 395.71 395.71"
        xmlSpace="preserve"
      >
        <g>
          <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
        </g>
      </svg>
      {locationStatus || "Fetching location..."}
    </div>
  )}
</div>
  );
};

export default LocationFetcher;
