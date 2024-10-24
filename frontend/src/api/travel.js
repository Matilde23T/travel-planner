import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'https://travel-planner-791c.onrender.com/travelplanner';

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
