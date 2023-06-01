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

  router.put('/v2/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task updated successfully', task: task });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  router.delete('/v2/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

router.post('/v2/tasks', async (req, res, next) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json({ message: 'Task saved successfully', task: task });
  } catch (error) {
    next(error);
  }
});

router.get('/v2/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
