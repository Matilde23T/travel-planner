const mongoose = require('mongoose');
const Travel = require('../models/travelModel');

const travelMiddleware = async (req, res, next) => {
  try {
    // Verifica validità ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID non valido' });
    }

    const travel = await Travel.findById(req.params.id);

    //controllo esistenza del viaggio
    if (!travel) {
      return res.status(404).json({ error: 'trip not found' });
    }

    // Controllo associazione del viaggio al utente
    if (travel.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'access denied' });
    }

     next();
  } catch (error) {
    // Gestione errori database
    console.error(error);
    res.status(500).json({ error: 'travel data recovery error. check the database connection' });
  }
};

module.exports = travelMiddleware;
