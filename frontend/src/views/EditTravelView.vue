<template>
    <div>
        <editTravel :tripId="tripId" />
        
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import editTravel from '@/components/editTravel.vue';
const route = useRoute();
const tripId = route.params.id; 
</script>

