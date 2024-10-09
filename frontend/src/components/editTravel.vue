 <template>
<div class="container mt-5">
    <form @submit.prevent="submitForm">
   <div class="mb-4">
    <h2>
          <input
            type="text"
            v-model="trip.title"
            class="invisible-input"
            placeholder="Inserisci il titolo ... "
            @blur="saveInput"
            @keyup.enter="saveInput"
            ref="inputField"
          />
        </h2>
      </div>
      <div class="mb-3">
        <label for="destination" class="form-label">Destination</label>
        <input type="text" v-model="trip.destination" class="form-control" id="destination" required />
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
        <label for="participants" class="form-label">Partecipants</label>
        <input
          type="text"
          v-model="participantsString"
          class="form-control"
          id="participants"
          placeholder="Inserisci i nomi separati da virgola"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="trip.description" class="form-control" id="description" @input="autoResize" rows="1" placeholder="Descrivi il viaggio"></textarea>
      </div>
      <div class="mb-3">
        <label for="notes" class="form-label">Notes</label>
        <textarea v-model="trip.notes" class="form-control" id="notes"></textarea>
      </div>

      <div class="mb-3">
        <h4>Search for a place on the map</h4>
        <MapView />
      </div>

      <button type="submit" class="btn btn-primary">Change travel plan</button>
    </form>
  </div>

      
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { updateTravel, getUserTravels } from '../api/travel';
  import MapView from '@/components/mapView.vue';
  import '../assets/edit.css';
  
  const router = useRouter();
  const route = useRoute();
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
  
  // Funzione per caricare i dati del viaggio esistente
  const loadTripData = async () => {
    const id = route.params.id; // ID dal router
    const travels = await getUserTravels(); 
    const travelData = travels.find(travel => travel._id === id); 
  
    if (travelData) {
      // Converte le date nel formato richiesto
      trip.value = {
        ...travelData,
        startDate: new Date(travelData.startDate).toISOString().split('T')[0], 
        endDate: new Date(travelData.endDate).toISOString().split('T')[0],
      };
      participantsString.value = travelData.participants.join(', '); // Convertire l'array in stringa
    } else {
      console.error('trip not found');
      alert('trip not found');
    }
  };
  
  // Funzione per inviare il modulo
  const submitForm = async () => {
    try {
      trip.value.participants = participantsString.value.split(',').map(participant => participant.trim()); 
      await updateTravel(route.params.id, trip.value); 
      alert('travel plan successfully modified!');
      router.push({ name: 'dashboard' }); 
    } catch (error) {
      console.error('trip data modification error:', error);
      alert('trip data modification error: ' + error.message);
    }
  };
  
  // Funzione per ridimensionare automaticamente il textarea
  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  
  // Funzione per salvare l'input 
  const saveInput = () => {

  };
  
  // Carica dati del viaggio al montaggio del componente
  onMounted(() => {
    loadTripData();
  });
  </script>
  
 