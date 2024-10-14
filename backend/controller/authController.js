const User = require ('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// Registrazione utente
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ message: 'user registered successfully!' });
  } catch (error) {
    res.status(400).send({ error: 'error with user registration' });
  }
};

// Login utente
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error:'invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send({ error:'invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
};
