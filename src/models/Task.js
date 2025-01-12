const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  status: { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
});
module.exports = mongoose.model('Task', taskSchema);
