const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    enum: ['Hexaworks', 'Babil', 'Babil Kitap'],
    required: true,
    default: 'Hexaworks',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dueDate: {
    type: Date,
    default: new Date
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    required: true,
    default: 'To Do',
  },
  startDate: {
    type: Date,
    default: null
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
