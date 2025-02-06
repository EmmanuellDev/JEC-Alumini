import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaTransgender, FaCalendar, FaBriefcase, FaUniversity, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

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

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedData = response.data;

        Object.keys(fetchedData).forEach((key) => {
          if (!fetchedData[key]) {
            fetchedData[key] = "Enter your details...";
          }
        });

        setUserData(fetchedData);
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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/user/update", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 min-w-[10%] ml-[15%]">
        <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-200">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600 kumar-one-regular">Account Settings</h1>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
              >
                Edit
              </button>
            ) : (
              <button 
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-200 transition"
              >
                Save
              </button>
            )}
          </div>

          {/* Profile Pic Section */}
          <div className="flex flex-col items-left mb-8">
            <label htmlFor="profilePic" className={`cursor-pointer ${!isEditing && "pointer-events-none opacity-50"}`}>
              <img
                src={userData.profilePic !== "Enter your details..." ? userData.profilePic : "https://via.placeholder.com/120"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
              />
            </label>
            {isEditing && <input type="file" id="profilePic" className="hidden" onChange={(e) => handleChange(e)} />}
          </div>

          {/* Form Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="Email" name="email" value={userData.email} onChange={handleChange} disabled={!isEditing} icon={<FaEnvelope />} />
            <InputField label="Password" name="password" value={userData.password} onChange={handleChange} disabled={!isEditing} type="password" icon={<FaLock />} />
            <InputField label="First Name" name="firstName" value={userData.firstName} onChange={handleChange} disabled={!isEditing} icon={<FaUser />} />
            <InputField label="Last Name" name="lastName" value={userData.lastName} onChange={handleChange} disabled={!isEditing} icon={<FaUser />} />
            <Dropdown label="Gender" name="gender" value={userData.gender} onChange={handleChange} options={["Male", "Female"]} disabled={!isEditing} icon={<FaTransgender />} />
            <InputField label="Date of Birth" name="dob" value={userData.dob} onChange={handleChange} disabled={!isEditing} icon={<FaCalendar />} />
            <InputField label="Mobile Number" name="mobile" value={userData.mobile} onChange={handleChange} disabled={!isEditing} icon={<FaPhone />} />
            <Dropdown label="Branch" name="branch" value={userData.branch} onChange={handleChange} options={["CSE", "EEE", "ECE", "MECH", "IT", "TEX"]} disabled={!isEditing} icon={<FaUniversity />} />
            <InputField label="Graduation Year" name="graduationYear" value={userData.graduationYear} onChange={handleChange} disabled={!isEditing} icon={<FaUniversity />} />
            <InputField label="Address" name="address" value={userData.address} onChange={handleChange} disabled={!isEditing} icon={<FaMapMarkerAlt />} />
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <label className="font-semibold text-gray-700">Detailed Self-Description</label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full h-24 p-3 mt-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-400 ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, disabled, type = "text", icon }) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-3 text-black">{icon}</span>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        disabled={disabled} 
        className={`w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring focus:ring-teal-400 ${disabled && "bg-gray-100 cursor-not-allowed"}`} 
      />
    </div>
  </div>
);

// Reusable Dropdown Component
const Dropdown = ({ label, name, value, onChange, options, disabled, icon }) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-3 text-black">{icon}</span>
      <select name={name} value={value} onChange={onChange} disabled={disabled} className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring focus:ring-teal-400">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  </div>
);

export default Settings;