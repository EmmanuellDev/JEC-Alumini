const express = require("express");
const multer = require("multer");
const User = require("../models/user");

const router = express.Router();

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure you have an 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST route to create a new user
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const {
      email,
      confirmEmail,
      captcha,
      enteredCaptcha,
      firstName,
      lastName,
      gender,
      dob,
      mobile,
      location,
      password,
      confirmPassword,
      branch,
      gradYear,
      convocationYear,
      regNumber,
      employed,
    } = req.body;

    const photo = req.file ? req.file.path : null;

    // Create new user
    const newUser = new User({
      email,
      confirmEmail,
      captcha,
      enteredCaptcha,
      firstName,
      lastName,
      gender,
      dob,
      mobile,
      location: JSON.parse(location), // Parse the location object if sent as a string
      password,
      confirmPassword,
      branch,
      gradYear,
      convocationYear,
      regNumber,
      employed,
      photo,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// GET route to fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
