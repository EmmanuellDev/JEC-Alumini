import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JEC from "../imgs/jec-logo.png"; // JEC Logo
import BG from "../imgs/jec-bg.jpeg"; // Background Image

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    regNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, regNumber } = formData;

    // Add your validation and authentication logic here
    if (email && password && regNumber) {
      // Proceed with login
      console.log("Logged in successfully");

      // Redirect after successful login (you can modify this based on your app's flow)
      navigate("/dashboard");
    } else {
      setErrorMessage("Please fill out all fields correctly.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${BG})`, // Using the imported background image
        backgroundSize: "cover", // Ensures the background image covers the whole screen
        backgroundPosition: "center", // Centers the background image
      }}
    >
      <div className="bg-white/40 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Header with JEC Logo */}
        <div className="w-full mb-6">
          <img
            src={JEC}
            alt="JEC Logo"
            className="w-full h-20 object-contain"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full mb-4 p-3 border-2 border-black rounded bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full mb-4 p-3 border-2 border-black rounded bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="regNumber"
            value={formData.regNumber}
            onChange={handleInputChange}
            placeholder="University Register Number"
            className="w-full mb-4 p-3 border-2 border-black rounded bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white px-6 py-3 rounded w-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-blue-500">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
