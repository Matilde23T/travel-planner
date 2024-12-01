import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'https://travel-planner-791c.onrender.com';

// Funzione per gestire errori dettagliati
const handleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 403:
        throw new Error('Access denied: you do not have permission to modify this travel.');
      case 404:
        throw new Error('Travel not found: please check the ID and try again.');
      default:
        throw new Error(error.response.data?.error || 'An unexpected error occurred.');
    }
  } else {
    throw new Error('A network error occurred. Please check your internet connection.');
  }
};

// Funzione per ottenere i viaggi dell'utente
export const getUserTravels = async () => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.get(`${API_URL}/travels`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funzione per creare un nuovo viaggio
export const createTravel = async (tripData) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.post(`${API_URL}/travels`, tripData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funzione per aggiornare un viaggio
export const updateTravel = async (id, tripData) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.put(`${API_URL}/travels/${id}`, tripData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funzione per eliminare un viaggio
export const deleteTravel = async (id) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.delete(`${API_URL}/travels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

