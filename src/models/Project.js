const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  coverImage: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});
module.exports = mongoose.model('Project', projectSchema);
