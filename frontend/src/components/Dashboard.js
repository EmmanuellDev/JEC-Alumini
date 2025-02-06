import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import Navbar from "./Navbar";

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
        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  const welcomeMessage = userData.gender === "Male" ? "Welcome Mr." : "Welcome Madam.";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-[90rem] ml-[15%] min-h-[48rem] bg-white shadow-lg rounded-xl p-8 border border-gray-200 w-full">
          {/* Welcome Message */}
          <h1 className="text-2xl font-bold text-teal-600 mb-6 ml-4">{welcomeMessage}</h1>

          {/* Profile Section */}
          <div className="flex items-center space-x-6 border-b pb-6">
            <img
              src={userData.profilePic || "https://via.placeholder.com/120"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-teal-500"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{userData.firstName} {userData.lastName}</h2>
              <p className="text-gray-600 font-medium">Reg No: {userData.regNumber}</p>
            </div>
          </div>

          {/* Job & Workplace */}
          <div className="mt-6 border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-700">Job & Workplace</h3>
            <p className="text-gray-600">{userData.job || "Open to Work"}</p>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex space-x-6 border-b pb-6">
            {userData.facebook && (
              <a href={userData.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition" />
              </a>
            )}
            {userData.twitter && (
              <a href={userData.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-400 text-2xl hover:scale-110 transition" />
              </a>
            )}
            {userData.linkedin && (
              <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-700 text-2xl hover:scale-110 transition" />
              </a>
            )}
            {userData.instagram && (
              <a href={userData.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-600 text-2xl hover:scale-110 transition" />
              </a>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mt-6 border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-700">Date of Birth</h3>
            <p className="text-gray-600">{userData.dob}</p>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 border-b pb-6">
            <InfoCard label="Phone" value={userData.mobile} />
            <InfoCard label="Email" value={userData.email} />
            <InfoCard label="Location" value={userData.location} />
          </div>

          {/* About / Bio Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">About Me</h3>
            <p className="text-gray-600">{userData.bio || "No bio available."}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Info Card Component
const InfoCard = ({ label, value }) => (
  <div className="p-4 bg-teal-100 border-l-4 border-teal-500 rounded-lg">
    <p className="text-gray-600 font-semibold">{label}</p>
    <p className="text-gray-800 text-lg">{value}</p>
  </div>
);

export default Dashboard;
