const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a Schema for the user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Email must be unique
  },
  password: {
    type: String,
    required: true,
  }
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // if password is not modified, skip hashing
  this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
