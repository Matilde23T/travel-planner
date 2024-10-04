const Travel = require('../models/travelModel');

//POST
exports.createTravel = async (req, res) => {
  const { title, destination, startDate, endDate, budget, participants, description, notes } = req.body;

  try {
    const newTravel = new Travel({
      title,
      destination,
      startDate,
      endDate,
      budget,
      participants,
      description,
      notes,
      user: req.user.id  
    });

    const savedTravel = await newTravel.save();
    res.status(201).json(savedTravel);
  } catch (error) {
    res.status(500).json({ error: 'trip planning creation error' });
  }
};

//GET
exports.getUserTravels = async (req, res) => {
    try {
      const travels = await Travel.find({ user: req.user.id });  
      res.status(200).json(travels);
    } catch (error) {
      res.status(500).json({ error: 'travel plans recovery error' });
    }
  };

 //PUT
exports.updateTravel = async (req, res) => {
    const { id } = req.params;
    const { title, destination, startDate, endDate, budget, participants, description, notes } = req.body;
  
    try {
      const updatedTravel = await Travel.findByIdAndUpdate(
        id,
        { title, destination, startDate, endDate, budget, participants, description, notes },
        { new: true }  
      );
  
      if (!updatedTravel) {
        return res.status(404).json({ error: 'trip not found' });
      }
  
      res.status(200).json(updatedTravel);
    } catch (error) {
      res.status(500).json({ error: 'trip update error' });
    }
  };

 //DELETE
exports.deleteTravel = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTravel = await Travel.findByIdAndDelete(id);
  
      if (!deletedTravel) {
        return res.status(404).json({ error: 'trip not found' });
      }
  
      res.status(200).json({ message: 'trip successfully deleted' });
    } catch (error) {
      res.status(500).json({ error: 'trip deletion error' });
    }
  };
  