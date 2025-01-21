require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

// Schema for Alumni data
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
    cb(null, "uploads/"); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName); // Filename includes timestamp to prevent conflicts
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

    // Validation
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

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new alumni document
    const newAlumni = new Alumni({
      email,
      password: hashedPassword,
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

// API route for handling login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation for login fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password." });
    }

    // Find user by email
    const user = await Alumni.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Make sure it's properly defined in your .env file
      { expiresIn: "1h" } // Token expires in 1 hour
      );
      console.log("Generated Token:", token);

    // Respond with the token
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  console.log("Token:", token); // Log the token to check

  // Verify the token and decode the user
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    console.log("Decoded user:", user); // Log the decoded user info for debugging
    req.user = user;
    next();
  });
};

// Example of a protected route that requires authentication
app.get("/api/protected", authenticateJWT, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route.", user: req.user });
});

// Route to get the user's dashboard details
app.get("/api/dashboard", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the userId from the decoded JWT token

    // Fetch the user details from the database using the userId
    const user = await Alumni.findById(userId);

    if (!user) {
      // If no user is found, return a 404 error
      return res.status(404).json({ message: "User not found." });
    }

    // Send back only the required fields (name, registration number, and mobile)
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      regNumber: user.regNumber,
      mobile: user.mobile,
    });
  } catch (error) {
    // Handle any server errors during the process
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});


// Static folder for serving uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
