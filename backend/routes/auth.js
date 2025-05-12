const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

// Sign up route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already registered!' });
  }

  // Create a new user
  const user = new User({
    name,
    email,
    password,
  });

  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found!' });
  }

  // Compare the password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password!' });
  }

  // User is authenticated - Start session
  req.session.userId = user._id; // Store user ID in session
  res.status(200).json({ message: 'Login successful!', userId: user._id });
});

module.exports = router;
