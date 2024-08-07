import axios from 'axios';

const API_URL = 'http://localhost:5001/api/circuits';

export const getCircuits = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data);  // Debugging log
    return response.data;
  } catch (error) {
    console.error('Error fetching circuits:', error);
    throw error;
  }
};
