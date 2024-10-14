<template>
    <div class="container mt-5">
     
      <h2 class="text-center mb-4" id="title-dash">Your Dashboard</h2>
  
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
  import '../assets/dashboard.css';
  
  const router = useRouter(); 
  const trips = ref([]);
  
  const loadTrips = async () => {
    try {
      const data = await getUserTravels();
      trips.value = data;
    } catch (error) {
      console.error('error loading trip data:', error);
      router.push({ name: 'auth'});
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
  
  
  
  