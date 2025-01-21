const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  gender: String,
  dob: Date,
  mobile: String,
  location: {
    country: String,
    state: String,
    city: String,
  },
  branch: String,
  gradYear: String,
  convocationYear: String,
  regNumber: String,
  employed: String,
  proof: String
});

module.exports = mongoose.model('Alumni', alumniSchema);