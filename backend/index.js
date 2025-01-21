require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

// Create the Express app
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MongoDB connection using the URI from the .env file
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

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
  proof: String, // Path to the uploaded file
});

// Create model for alumni
const Alumni = mongoose.model("Alumni", alumniSchema);

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// API route for handling sign-up
app.post("/api/auth/signup", upload.single("proof"), async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      gender,
      dob,
      mobile,
      location,
      branch,
      gradYear,
      convocationYear,
      regNumber,
      employed,
    } = req.body;

    const proof = req.file ? req.file.filename : null; // Handle file upload

    // Validation (you can add more validation as needed)
    if (
      !email ||
      !password ||
      !firstName ||
      !branch ||
      !gradYear ||
      !convocationYear ||
      !regNumber ||
      !employed ||
      !proof
    ) {
      return res.status(400).json({ message: "Please complete all fields." });
    }

    // Create new alumni document
    const newAlumni = new Alumni({
      email,
      password,
      firstName,
      lastName,
      gender,
      dob,
      mobile,
      location,
      branch,
      gradYear,
      convocationYear,
      regNumber,
      employed,
      proof,
    });

    // Save to the database
    await newAlumni.save();

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error. Please try again later." });
  }
});

// Static folder for serving uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
