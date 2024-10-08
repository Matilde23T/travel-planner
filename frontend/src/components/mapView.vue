<template>
    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, onBeforeUnmount } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-control-geocoder';
  import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
  
  const map = ref(null);
  
  const initMap = () => {
    
    if (map.value) {
      map.value.remove(); 
      console.log('Mappa esistente rimossa.');
    }
  
    // Crea una nuova mappa
    map.value = L.map('map').setView([51.505, -0.09], 13);
  
    // layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map.value);
  
    //controllo Geocoder alla mappa
    L.Control.geocoder().addTo(map.value);
    console.log('Mappa inizializzata.');
  };
  
  onMounted(() => {
    initMap(); 
  });
  
  onBeforeUnmount(() => {
    if (map.value) {
      map.value.remove(); 
      console.log('Mappa rimossa al smontaggio.');
    }
  });
  </script>
  
  <style scoped>
  .map-container {
    max-width: 800px;
    margin: auto;
  }
  
  .map {
    height: 400px;
    width: 100%;
  }
  </style>
  




