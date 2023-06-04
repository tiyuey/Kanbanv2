const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/v2/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  module.exports =  router;