const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5003;

// Imposta gli allowed origins per CORS
const allowedOrigins = [
  'https://travel-planner-neon.vercel.app',
  'https://travel-planner-mati-webdevs-projects.vercel.app'
];

// Middleware CORS globale
app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Log dell'origin della richiesta
    if (!origin) return callback(null, true); // Consente le richieste senza `origin`
    if (allowedOrigins.indexOf(origin) === -1) {
      console.error('Blocked by CORS:', origin); // Log quando l'origin è bloccato
      return callback(new Error('Not allowed by CORS'));
    }
    return callback(null, true);
  },
  credentials: true
}));

// Risposta globale a tutte le richieste OPTIONS
app.options('*', (req, res) => res.sendStatus(200));

// Middleware per parsing JSON
app.use(express.json());

// Connessione MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connesso a MongoDB');
  })
  .catch(err => console.error('Errore di connessione a MongoDB:', err));

// Importa le rotte
const authRoutes = require('./backend/routes/authRoutes'); 
const travelRoutes = require('./backend/routes/travelRoutes');

// Configura le rotte
app.use('/travelplanner/auth', authRoutes);
app.use('/travelplanner/travels', travelRoutes);

// Gestione degli errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong' });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
