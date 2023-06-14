const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');


const Task = require('../models/task');

router.put('/v2/tasks/:id', isAuth, async (req, res) => {
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

module.exports = router;