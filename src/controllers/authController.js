const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register User
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user', error });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    res.send({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).send({ message: 'Error logging in', error });
  }
};