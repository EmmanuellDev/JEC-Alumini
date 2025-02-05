import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdDashboard, MdPayment, MdOutlineVolunteerActivism } from "react-icons/md";
import { FaUserCircle, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  // Determine the Welcome Message
  const welcomeMessage = userData.gender === "Male" ? "Welcome Mr." : "Welcome Madam.";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
<Navbar />

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          {/* Welcome Message */}
          <h1 className="text-2xl font-bold text-teal-600 text-center">{welcomeMessage}</h1>

          {/* Profile Section */}
          <div className="flex items-center mt-6">
            {/* Profile Picture */}
            <img
              src={userData.profilePic || "https://via.placeholder.com/120"} // Default placeholder if no profile pic
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-teal-500"
            />

            {/* Name & Reg Number */}
            <div className="ml-6">
              <h2 className="text-xl font-bold text-gray-800">{userData.firstName} {userData.lastName}</h2>
              <p className="text-gray-600">Reg No: {userData.regNumber}</p>
            </div>
          </div>

          {/* Job Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Job & Workplace</h3>
            <p className="text-gray-600">{userData.job || "Open to Work"}</p>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex space-x-4">
            {userData.facebook && (
              <a href={userData.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-600 text-2xl" />
              </a>
            )}
            {userData.twitter && (
              <a href={userData.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-400 text-2xl" />
              </a>
            )}
            {userData.linkedin && (
              <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-700 text-2xl" />
              </a>
            )}
            {userData.instagram && (
              <a href={userData.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-600 text-2xl" />
              </a>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Date of Birth</h3>
            <p className="text-gray-600">{userData.dob}</p>
          </div>

          {/* Contact Details - Phone, Email, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
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

// Reusable Navigation Item Component
const NavItem = ({ icon: Icon, label, onClick }) => (
  <li
    className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-teal-500 hover:text-white rounded-md cursor-pointer transition"
    onClick={onClick}
  >
    <Icon className="text-xl" />
    <span className="text-lg font-medium">{label}</span>
  </li>
);

// Reusable Info Card Component
const InfoCard = ({ label, value }) => (
  <div className="p-4 bg-teal-100 border-l-4 border-teal-500 rounded-lg">
    <p className="text-gray-600 font-semibold">{label}</p>
    <p className="text-gray-800 text-lg">{value}</p>
  </div>
);

export default Dashboard;
