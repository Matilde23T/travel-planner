// routes/travelRoutes.js
const express = require('express');
const router = express.Router();
const travelController = require('../controller/travelController');
const authMiddleware = require('../middleware/authMiddleware');
const travelMiddleware = require('../middleware/travelMiddleware'); 
 
//POST
router.post('/', authMiddleware, travelController.createTravel);

//GET
router.get('/', authMiddleware, travelController.getUserTravels);

//PUT
router.put('/:id', authMiddleware,travelMiddleware, travelController.updateTravel);

//DELETE
router.delete('/:id', authMiddleware, travelMiddleware, travelController.deleteTravel);

module.exports = router;


