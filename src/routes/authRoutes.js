const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login a user
router.post('/logout', logoutUser); // Logout a user

module.exports = router;
