<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Your Dashboard</h2>
  
      <div class="row">
        <!-- viaggi pianificati -->
        <div v-for="(trip, index) in trips" :key="trip._id" class="col-md-4 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ trip.title }}</h5>
              <p class="card-text">Destination: {{ trip.destination }}</p>
              <button class="btn btn-warning" @click="editTrip(trip._id)">Edit</button>
              <button class="btn btn-danger" @click="deleteTrip(trip._id)">Delete</button>
            </div>
          </div>
        </div>
  
        <!-- Casella per creare un nuovo viaggio -->
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm d-flex justify-content-center align-items-center" style="height: 200px;">
            <div class="text-center">
              <button class="btn btn-primary btn-lg" @click="goToNewTravel">+ create a new travel plan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router'; 
  import { getUserTravels, deleteTravel, } from '../api/travel';
  
  const router = useRouter(); 
  const trips = ref([]);
  
  const loadTrips = async () => {
    try {
      const data = await getUserTravels();
      trips.value = data;
    } catch (error) {
      console.error('error loading trip data:', error);
    }
  };
  
  // Naviga al modulo per creare un nuovo viaggio - newtravel.vue
  const goToNewTravel = () => {
    router.push({ name: 'newtravel' }); 
  };
  
  // Naviga al modulo per modificare un viaggio - edittravel.vue
  const editTrip = (id) => {
    router.push({ name: 'editTravel', params: { id } }); 
  };
  
  // Elimina un viaggio
  const deleteTrip = async (id) => {
    try {
      await deleteTravel(id);
      trips.value = trips.value.filter(trip => trip._id !== id);
    } catch (error) {
      console.error('error deleting trip data:', error);
    }
  };
  
  onMounted(() => {
    loadTrips();
  });

  </script>
  
  <style scoped>
  .card {
    height: 100%;
    border-radius: 20px;
    background-color:#fcfefe;
}
  .card .btn {
     font-size: 1.2rem;
     font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  }
  
  .card-body {
    text-align: center;
    font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  }
  
  button {
    width: 300px;
    margin-bottom: 10px;
    border-radius: 20px;
    }
    @media (max-width: 576px) {
        
    h2{
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 28px;
  font-weight: bold;
    }
    .card .btn {
     font-size:17px; 
  }
  
  .card-title{
    font-size: 15px;
  }

  .card-text{
    font-size: 15px;
  }
   button {
    width: 300px;
    margin-bottom: 10px;
    border-radius: 20px;
    }
    }
  </style>
  