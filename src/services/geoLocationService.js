import axios from 'axios';

export const fetchGeoLocation = async () => {
  try {
    const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
    return response.data;
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return null;
  }
};
