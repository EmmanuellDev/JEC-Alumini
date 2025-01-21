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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email && password) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token (use context or localStorage)
          localStorage.setItem("authToken", data.token);
          navigate("/dashboard");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    } else {
      setErrorMessage("Please fill out all fields.");
    }
  };


  return (
    <div
      className="flex items-center justify-center w-full min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${BG})`, // Using the imported background image
        backgroundSize: "cover", // Ensures the background image covers the whole screen
        backgroundPosition: "center", // Centers the background image
      }}
    >
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-white/40">
        {/* Header with JEC Logo */}
        <div className="w-full mb-6">
          <img
            src={JEC}
            alt="JEC Logo"
            className="object-contain w-full h-20"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
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
            className="w-full p-3 mb-4 border-2 border-black rounded bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-3 mb-4 border-2 border-black rounded bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="regNumber"
            value={formData.regNumber}
            onChange={handleInputChange}
            placeholder="University Register Number"
            className="w-full p-3 mb-4 border-2 border-black rounded bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMessage && (
            <p className="mb-4 text-center text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 text-white transition-colors rounded bg-gradient-to-r from-blue-400 to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-blue-500">
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
