<template>

<div class="d-flex justify-content-center mt-4">
  <button type="button" id= "quit-btn" @click="confirmExit">
    <p>returns to the dashboard <i class="fa-solid fa-arrow-rotate-left me-2" id="quit-icon"></i></p>
  </button>
</div>

<div class="container mt-5">
<form @submit.prevent="submitForm">
          <div class="mb-4">
  <h1>
    <textarea
      v-model="trip.title"
      class="invisible-input"
      placeholder="enter the title..."
      @blur="saveInput"
      @keyup.enter="saveInput"
      ref="inputField"
      rows="1"
      style="resize: none; overflow: hidden;" 
       @input="autoResize"
    ></textarea>
  </h1>
</div>

     
      <div class="mb-3">
        <label for="destination" class="form-label">Destination</label>
        <textarea v-model="trip.destination" class="form-control" id="destination" @input="autoResize" rows="1" placeholder="destination"></textarea>
      </div>
     
      <div class="mb-3">
        <label for="startDate" class="form-label">Start date</label>
        <input type="date" v-model="trip.startDate" class="form-control" id="startDate" required />
      </div>

      <div class="mb-3">
        <label for="endDate" class="form-label">End date</label>
        <input type="date" v-model="trip.endDate" class="form-control" id="endDate" required />
      </div>

      <div class="mb-3">
        <label for="budget" class="form-label">Budget</label>
        <input type="number" v-model="trip.budget" class="form-control" id="budget" required />
      </div>

      <div class="mb-3">
        <label for="participants" class="form-label">Participants</label>
        <input
          type="text"
          v-model="participantsString"
          class="form-control"
          id="participants"
          placeholder="enter the names separated by commas"
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="trip.description" class="form-control" id="description" @input="autoResize" rows="1" placeholder="Describe your trip"></textarea>
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label">Notes</label>
        <textarea v-model="trip.notes" class="form-control" id="notes"@input="autoResize" rows="1" ></textarea>
      </div>

      <div class="mb-3">
        <h3>Search for a place on the map</h3>
        <MapView />
      </div>

      <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary" id="create-btn">Create travel plan</button>
    </div>
    </form>
   </div>

</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { createTravel } from '../api/travel'; 
  import MapView from '@/components/mapView.vue';
  import '../assets/newtravel.css';
 
 const router = useRouter();

 const confirmExit = () => {
  //popup di conferma
  if (window.confirm("Are you sure you want to quit?")) {
     router.push({ name: 'dashboard' }).then(() => {
      window.location.reload(); 
    });
  }
};

const trip = ref({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: 0,
    participants: [],
    description: '',
    notes: ''
  });
  const participantsString = ref('');
  
 // Funzione per inviare il modulo
const submitForm = async () => {
  try {
    
    trip.value.participants = participantsString.value.split(',').map(participant => participant.trim());
    
    // Crea un nuovo viaggio
    await createTravel(trip.value);
    alert('Travel plan successfully created!');
    // Naviga alla dashboard forzando l'aggiornamento della pagina
 router.push({ name: 'dashboard' }).then(() => {
      window.location.reload(); 
    });
    console.log('navigation completed');
} catch (error) {
    console.error('Error in creating the travel plan:', error);
    alert('Error in creating the travel plan: ' + error.message);
  }
};


  //textarea
  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
  };
  
  
  const saveInput = () => {};
  </script>  
  
  
  
