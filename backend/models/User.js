// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true }
  },
  branch: { type: String, required: true },
  gradYear: { type: String, required: true },
  convocationYear: { type: String, required: true },
  regNumber: { type: String, required: true },
  employed: { type: String, required: true },
  proof: { type: String } // File path will be stored after uploading
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
