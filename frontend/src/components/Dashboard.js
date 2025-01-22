import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        setError(null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Welcome, {userData.firstName} {userData.lastName}
      </h1>
      <div className="space-y-4 text-lg">
        <p>
          <strong className="font-semibold text-gray-600">Email:</strong>{" "}
          {userData.email}
        </p>
        <p>
          <strong className="font-semibold text-gray-600">
            Registration Number:
          </strong>{" "}
          {userData.regNumber}
        </p>
        <p>
          <strong className="font-semibold text-gray-600">
            Mobile Number:
          </strong>{" "}
          {userData.mobile}
        </p>
      </div>
      <button
        className="px-4 py-2 mt-6 text-white bg-red-500 rounded-md hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;