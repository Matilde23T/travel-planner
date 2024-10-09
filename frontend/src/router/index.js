import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';
import DashboardView from '@/views/DashboardView.vue';
import NewTravelView from '@/views/NewTravelView.vue';
import editTravel from '@/components/editTravel.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth', 
      name: 'auth',
      component: AuthView, 
    },
    {
      path: '/dashboard', 
      name: 'dashboard',
      component: DashboardView, 
      meta: { requiresAuth: true }
    },
    { 
      path: '/editTravel/:id',
      name: 'editTravel', 
      component: editTravel, 
    },
    {
      path: '/newtravel',
      name: 'newtravel',
      component: NewTravelView, 
      meta: { requiresAuth: true }
    },
   
    {
      path: '/', // rotta predefinita
      redirect: '/auth' 
    }
  ],
});

// controlla l'autenticazione
router.beforeEach((to, from, next) => {
  // Verifica se il token di autenticazione è presente
  const isAuthenticated = !!localStorage.getItem('token'); 

  // Controlla se la rotta richiede autenticazione
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Se non autenticato, reindirizza alla pagina di login
    next({ name: 'auth' });
  } else {
   
    next();
  }
});

export default router;
