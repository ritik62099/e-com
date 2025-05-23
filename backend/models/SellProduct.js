const mongoose = require('mongoose');

const sellProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  price: Number,
  category: String,
  condition: String,
  rating: Number,
  image: {
    type: String,
    default: '/images/default-device.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SellProduct', sellProductSchema);
