const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const isAuth = require('../../middleware/isAuth');

router.post('/v2/tasks', isAuth, async (req, res, next) => {
  const { title, description, brand, assignedTo, dueDate } = req.body;

  const task = new Task({
    title,
    description,
    brand,
    assignedTo,
    dueDate,
  });

  try {
    await task.save();
    res.status(201).json({ message: 'Task saved successfully', task });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
