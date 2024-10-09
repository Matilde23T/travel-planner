<template>
    <div class="userdiv">
        <h1 class="title">Travel Planner</h1>
        <div class="box-dates"> 
      <h2 class="subtitle">To enter and use Travel Planner you need to login or register</h2>
      
      <p class="actions">{{ isLogin ? 'Login' : 'Register' }}</p> 
      <br>
      <div class="userform">
        <form @submit.prevent="handleSubmit">
          <!-- Campo "Nome" presente solo in registrazione-->
          <input
            v-if="!isLogin"
            type="text"
            v-model="name"
            placeholder="Name"
            required
          />
          <br>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
          />
          <br>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
          <br>
          <button type="submit" :disabled="loading">{{ isLogin ? 'Login' : 'Register' }}</button>
          <br>
          <button type="button" @click="toggleForm">
            {{ isLogin ? 'switch to register' : 'switch to login' }}
          </button>
        </form>
      </div>
        </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="loading">Loading...</div> <!-- Messaggio di caricamento -->
    </div>


    <!------------------footer----------------------------->
    <footer id="footer-section">
    <p>© Copyright Matilde Tiengo 2024  
      <a href="https://github.com/Matilde23T" class="icons">
        <i class="fa-brands fa-github fa-lg"></i>
        </a>
    </p>   
  </footer> 
  


  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { registerUser, loginUser } from '../api/authentication';
  import { useRouter } from 'vue-router'; 
  import '../assets/auth.css'; //CSS AUTH
  
  // Variabili reattive
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const isLogin = ref(true); 
  const error = ref(null);
  const loading = ref(false);
  const router = useRouter(); 
  
  // Funzione per l'invio del form
  const handleSubmit = async () => {
    loading.value = true;
    error.value = null; 
    try {
      const userData = {
        ...(isLogin.value ? {} : { name: name.value }), 
        email: email.value,
        password: password.value,
      };
  
      let response;
      if (isLogin.value) {
        response = await loginUser(userData);
        // Salva il token al login
        localStorage.setItem('token', response.token); 
        alert('Login avvenuto con successo!');
        console.log('Token:', response.token);
        // Redirect alla dashboard
        router.push('/dashboard'); 
      } else {
        response = await registerUser(userData);
        alert('Registrazione avvenuta con successo!');
        
       
        const loginResponse = await loginUser({ email: email.value, password: password.value });
        localStorage.setItem('token', loginResponse.token); // Salva il token dopo la registrazione
        router.push('/dashboard'); 
      }
    } catch (err) {
      error.value = err.error || 'An error occurred during authentication'; 
    } finally {
      loading.value = false;
    }
  };
  
  // Funzione per alternare tra Login e Registrazione
  const toggleForm = () => {
    isLogin.value = !isLogin.value;
  };
  </script>
  

  