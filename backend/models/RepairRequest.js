const mongoose = require('mongoose');

const repairRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  problem: { type: String, required: true },
  date: { type: Date, required: true },
  contact: { type: String, required: true },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('RepairRequest', repairRequestSchema);
