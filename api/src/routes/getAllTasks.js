const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth')

const Task = require('../models/task');

router.get('/v2/tasks', isAuth, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;