const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, default: '' },

  bought: [{
    name: String,
    price: Number,
    date: String,
  }],
  sold: [{
    name: String,
    price: Number,
    date: String,
  }],
  repaired: [{
    name: String,
    issue: String,
    status: { type: String, default: 'Pending' },
    date: String,
  }],
}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Add this method to your schema:
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);
