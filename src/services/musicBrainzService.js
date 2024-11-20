import axios from 'axios';

export const fetchBandsByCity = async (city) => {
  try {
    const response = await axios.get(`https://video-call.shadbox.com/api/v1/bands/search?city=${city}`);
    console.log("API Full Response:", response.data);

    const bands = (response.data || []).map((band) => ({
      name: band.name,
      city: band.city,
     }));

    return bands;
  } catch (error) {
    console.error("Error fetching bands:", error);
    return [];
  }
};
