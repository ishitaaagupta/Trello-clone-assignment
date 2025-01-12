const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' }); // Email not found
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' }); // Incorrect password
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token,message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, logoutUser };
