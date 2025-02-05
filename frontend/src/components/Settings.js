import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Settings = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    mobile: "",
    branch: "",
    graduationYear: "",
    convocationYear: "",
    regNo: "",
    employed: false,
    profilePic: "",
    twitter: "",
    linkedin: "",
    github: "",
    portfolio: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/user/update", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <h1 className="text-2xl font-bold text-teal-600 text-center mb-6">Settings</h1>

          {/* Profile Pic Upload */}
          <div className="flex items-center justify-center mb-6">
            <label htmlFor="profilePic" className="cursor-pointer">
              <img
                src={userData.profilePic || "https://via.placeholder.com/120"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-teal-500 object-cover"
              />
            </label>
            <input type="file" id="profilePic" className="hidden" onChange={handleImageUpload} />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField label="Email" name="email" value={userData.email} onChange={handleChange} />
            <InputField
              label="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              type="password"
            />
            <InputField label="First Name" name="firstName" value={userData.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={userData.lastName} onChange={handleChange} />

            {/* Gender Selection */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Gender</label>
              <select name="gender" value={userData.gender} onChange={handleChange} className="input-field">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <InputField label="Date of Birth" name="dob" value={userData.dob} onChange={handleChange} />
            <InputField label="Mobile Number" name="mobile" value={userData.mobile} onChange={handleChange} />

            {/* Branch Selection */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Branch</label>
              <select name="branch" value={userData.branch} onChange={handleChange} className="input-field">
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="IT">IT</option>
                <option value="TEX">TEX</option>
              </select>
            </div>

            <InputField label="Graduation Year" name="graduationYear" value={userData.graduationYear} onChange={handleChange} />
            <InputField label="Convocation Year" name="convocationYear" value={userData.convocationYear} onChange={handleChange} />
            <InputField label="Registration No" name="regNo" value={userData.regNo} onChange={handleChange} />

            {/* Employed Checkbox */}
            <div className="flex items-center space-x-3">
              <input type="checkbox" name="employed" checked={userData.employed} onChange={handleChange} />
              <label className="font-semibold text-gray-700">Currently Employed</label>
            </div>

            {/* Social Media Links */}
            <InputField label="X (Twitter)" name="twitter" value={userData.twitter} onChange={handleChange} />
            <InputField label="LinkedIn" name="linkedin" value={userData.linkedin} onChange={handleChange} />
            <InputField label="GitHub" name="github" value={userData.github} onChange={handleChange} />
            <InputField label="Portfolio" name="portfolio" value={userData.portfolio} onChange={handleChange} />

            <InputField label="Address" name="address" value={userData.address} onChange={handleChange} />
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <label className="font-semibold text-gray-700">Detailed Self-Description</label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              className="w-full h-24 p-2 mt-2 border rounded-md focus:ring focus:ring-teal-400"
              placeholder="Write about yourself..."
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-center">
            <button onClick={handleSave} className="bg-teal-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className="input-field" />
  </div>
);

export default Settings;
