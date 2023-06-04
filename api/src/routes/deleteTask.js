const express = require('express');
const router = express.Router();

const Task = require('../models/task');

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

  module.exports = router;