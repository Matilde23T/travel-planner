import axios from 'axios';

const API_URL = 'http://localhost:5002/travelplanner/travels';

// Funzione per ottenere i viaggi dell'utente
export const getUserTravels = async () => {
  const token = localStorage.getItem('token'); // Ottieni il token dall'archiviazione locale
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Aggiungi il token all'intestazione
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funzione per creare un nuovo viaggio
export const createTravel = async (tripData) => {
  const token = localStorage.getItem('token'); // Ottieni il token dall'archiviazione locale
  try {
    const response = await axios.post(API_URL, tripData, {
      headers: {
        Authorization: `Bearer ${token}`, // Aggiungi il token all'intestazione
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funzione per aggiornare un viaggio
export const updateTravel = async (id, tripData) => {
  const token = localStorage.getItem('token'); // Ottieni il token dall'archiviazione locale
  try {
    const response = await axios.put(`${API_URL}/${id}`, tripData, {
      headers: {
        Authorization: `Bearer ${token}`, // Aggiungi il token all'intestazione
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Funzione per eliminare un viaggio
export const deleteTravel = async (id) => {
  const token = localStorage.getItem('token'); // Ottieni il token dall'archiviazione locale
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Aggiungi il token all'intestazione
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
