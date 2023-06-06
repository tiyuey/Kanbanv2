const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/v2/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

module.exports = router;
