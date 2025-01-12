const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: { type: Date },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
});

module.exports = mongoose.model('Task', taskSchema);
