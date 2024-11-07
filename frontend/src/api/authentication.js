

import axios from 'axios';


const API_URL = process.env.VUE_APP_API_URL || 'https://travel-planner-791c.onrender.com/travelplanner';
console.log("API_URL:", API_URL);
// Funzione per registrare un nuovo utente
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData); 
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};

// Funzione per il login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData); 
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};
