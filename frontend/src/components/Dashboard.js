import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null); // State to store errors
  const navigate = useNavigate();

  // Fetch user details after login
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage

    if (!token) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }

    // Log the token to verify it's being passed correctly
    console.log("Token from localStorage:", token);

    // Fetch user details from the server
    axios
      .get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserDetails(response.data); // Store the user data in the state
        setError(null); // Reset error on successful data fetch
      })
      .catch((error) => {
        console.error("Error fetching dashboard data", error);
        if (error.response && error.response.status === 403) {
          setError("Invalid or expired token. Please log in again.");
        } else if (error.response && error.response.status === 404) {
          setError("User not found.");
        } else {
          setError("Failed to load dashboard data. Please try again later.");
        }
      });
  }, [navigate]);

  // Show error message if any
  if (error) {
    return <div className="p-4 text-red-500 error">{error}</div>;
  }

  // Render loading state while data is being fetched
  if (!userDetails) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md dashboard">
      <h1 className="mb-4 text-2xl font-semibold">
        Welcome, {userDetails.firstName} {userDetails.lastName}
      </h1>
      <div className="user-info">
        <p>
          <strong className="font-medium">Registration Number:</strong>{" "}
          {userDetails.regNumber}
        </p>
        <p>
          <strong className="font-medium">Mobile Number:</strong>{" "}
          {userDetails.mobile}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;