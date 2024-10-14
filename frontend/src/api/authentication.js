

import axios from 'axios';


const API_URL = 'http://localhost:5002/travelplanner/auth'; 

// Funzione per registrare un nuovo utente
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData); 
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};

// Funzione per il login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData); 
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};
