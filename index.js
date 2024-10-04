const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5002;

// Middleware per parsing JSON
app.use(express.json());
// Middleware CORS richieste cross-origin
app.use(cors());

// Connessione MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connesso a MongoDB');
  })
  .catch(err => console.error('Errore di connessione a MongoDB:', err));
//rotte 
const authRoutes = require('./backend/routes/authRoutes'); 
const travelRoutes = require('./backend/routes/travelRoutes');

//autenticazione
app.use('/travelplanner/auth', authRoutes);
//gestione dei viaggi
app.use('/travelplanner/travels', travelRoutes);

// Gestione degli errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Qualcosa è andato storto!' });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
