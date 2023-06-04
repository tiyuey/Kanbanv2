const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.post('/v2/tasks', async (req, res, next) => {
    const task = new Task(req.body);
    try {
      await task.save();
      res.status(201).json({ message: 'Task saved successfully', task: task });
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;