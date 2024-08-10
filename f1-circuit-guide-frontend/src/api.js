import axios from 'axios';

// URL for your local API
const API_URL = 'http://localhost:5001/api/circuits';

// URL for the Ergast API to fetch the current F1 race calendar
const ERGAST_API_URL = 'https://ergast.com/api/f1/current.json';

// Function to get circuits from your local API
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

// Function to get the race calendar from the Ergast API
export const getRaceCalendar = async () => {
  try {
    const response = await axios.get(ERGAST_API_URL);
    return response.data.MRData.RaceTable.Races;
  } catch (error) {
    console.error('Error fetching race calendar:', error);
    return [];
  }
};
