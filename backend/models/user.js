const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  confirmEmail: { type: String, required: true },
  captcha: { type: String, required: true },
  enteredCaptcha: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile: { type: String, required: true },
  location: { type: locationSchema, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  branch: { type: String, required: true },
  gradYear: { type: Number, required: true },
  convocationYear: { type: Number, required: true },
  regNumber: { type: String, required: true },
  employed: { type: String, required: true },
  photo: { type: String }, // Assuming the photo will be stored as a URL or file path
});

const User = mongoose.model("User", userSchema);
module.exports = User;
