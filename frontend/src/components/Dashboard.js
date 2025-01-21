import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    console.log("Token from localStorage:", token);

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data); // Debug log
        setUserData(response.data);
        setError(null);
        setLoading(false); // Data is fetched, no longer loading
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false); // Stop loading on error
        if (error.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setError("Failed to load dashboard data");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 error">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md dashboard">
      <h1 className="mb-4 text-2xl font-semibold">
        Welcome, {userData.firstName} {userData.lastName}
      </h1>
      <div className="user-info">
        <p>
          <strong className="font-medium">Email:</strong> {userData.email}
        </p>
        <p>
          <strong className="font-medium">Registration Number:</strong>{" "}
          {userData.regNumber}
        </p>
        <p>
          <strong className="font-medium">Mobile Number:</strong>{" "}
          {userData.mobile}
        </p>
        {/* ... rest of your component ... */}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
