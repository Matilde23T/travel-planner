import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';
import DashboardView from '@/views/DashboardView.vue';
import NewTravelView from '@/views/NewTravelView.vue';
import EditTravelView from '@/views/EditTravelView.vue';

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
      component: EditTravelView, 
      meta: { requiresAuth: true }
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
const isAuthenticated = !!localStorage.getItem('token'); 

  //verifica del autenticazione richiesta dalla rotta
  if (to.meta.requiresAuth && !isAuthenticated) {
   next({ name: 'auth' });
  } else {
   
    next();
  }
});

export default router;
