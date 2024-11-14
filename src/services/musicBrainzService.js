import axios from 'axios';


const capitalizeCity = (city) => {
  return city
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const fetchBandsByCity = async (city) => {
  try {

    const normalizedCity = capitalizeCity(city);

    let backendResponse = await axios.get(`http://203.161.58.56/api/v1/bands/search?city=${normalizedCity}`);
    return backendResponse.data.bands || [];
  } catch (error) {
    console.error("Error fetching bands from backend, falling back to MusicBrainz API:", error);

    try {

      const encodedCity = encodeURIComponent(capitalizeCity(city));
      const url = `https://musicbrainz.org/ws/2/artist?query=area:${encodedCity}&fmt=json`;
      console.log("Generated MusicBrainz URL:", url);

      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch from MusicBrainz API');
      }

      const data = await response.json();
      console.log("Fetched data from MusicBrainz:", data);

      const bands = data.artists.map((artist) => ({
        name: artist.name || 'Unknown Name',
        founded_year: artist['life-span']?.begin || 'Undefined'
      }));

      return bands;
    } catch (error) {
      console.error("Error fetching bands from MusicBrainz API:", error);
      return [];
    }
  }
};
