const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5002;

const allowedOrigins = [
  'https://travel-planner-5cgj82zzk-mati-webdevs-projects.vercel.app',
  'https://travel-planner-neon.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Consenti richieste senza origin (Postman o localhost)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'));
    }
    return callback(null, true);
  },
  credentials: true 
}));

// Middleware per parsing JSON
app.use(express.json());

// Connessione MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connesso a MongoDB');
  })
  .catch(err => console.error('Errore di connessione a MongoDB:', err));

// Rotte
const authRoutes = require('./backend/routes/authRoutes'); 
const travelRoutes = require('./backend/routes/travelRoutes');

// Autenticazione
app.use('/travelplanner/auth', authRoutes);
// Gestione dei viaggi
app.use('/travelplanner/travels', travelRoutes);

// Gestione degli errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'something went wrong' });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
