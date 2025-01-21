import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const SignupPage = () => {
  const [session, setSession] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    captcha: "",
    enteredCaptcha: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    mobile: "",
    location: { country: "", state: "", city: "" },
    password: "",
    confirmPassword: "",
    branch: "",
    graduationYear: "",
    convocationYear: "",
    universityRegNo: "",
    employed: "",
    photo: null,
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [notification, setNotification] = useState("");

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const validateSession1 = () => {
    return (
      formData.email &&
      formData.email === formData.confirmEmail &&
      formData.enteredCaptcha === captcha
    );
  };

  const validateSession2 = () => {
    const { firstName, lastName, gender, dob, mobile, location, password, confirmPassword } = formData;
    return (
      firstName &&
      lastName &&
      gender &&
      dob &&
      mobile &&
      location.country &&
      location.state &&
      location.city &&
      password &&
      password === confirmPassword
    );
  };

  const validateSession3 = () => {
    const { branch, graduationYear, convocationYear, universityRegNo, employed, photo } = formData;
    return branch && graduationYear && convocationYear && universityRegNo && employed && photo;
  };

  const handleNext = () => {
    if ((session === 1 && validateSession1()) || (session === 2 && validateSession2())) {
      setSession(session + 1);
    } else {
      alert("Please fill all required fields correctly before proceeding.");
    }
  };

  const handleSubmit = () => {
    if (validateSession3()) {
      setNotification("Registration Successful");
    } else {
      setNotification("Failed to Register");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Alumni Signup</h1>

        {session === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Email</label>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="text"
                name="enteredCaptcha"
                placeholder="Enter Captcha"
                value={formData.enteredCaptcha}
                onChange={handleInputChange}
                className="w-2/3 p-2 border rounded mr-2"
              />
              <span className="text-lg font-bold">{captcha}</span>
              <button
                onClick={() => setCaptcha(generateCaptcha())}
                className="ml-2 text-blue-500 hover:underline"
              >
                Refresh
              </button>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-teal-500 text-white py-2 rounded mt-4 hover:bg-teal-600"
            >
              Next
            </button>
          </div>
        )}

        {session === 2 && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.location.country}
                  onChange={handleLocationChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.location.state}
                  onChange={handleLocationChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.location.city}
                  onChange={handleLocationChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-teal-500 text-white py-2 rounded mt-4 hover:bg-teal-600"
            >
              Next
            </button>
          </div>
        )}

        {session === 3 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Select Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="Mech">Mech</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Graduation Year</label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Convocation Year</label>
                <input
                  type="number"
                  name="convocationYear"
                  value={formData.convocationYear}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">University Register Number</label>
              <input
                type="text"
                name="universityRegNo"
                value={formData.universityRegNo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Are you presently employed?</label>
              <select
                name="employed"
                value={formData.employed}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-white py-2 rounded mt-4 hover:bg-teal-600"
            >
              Submit
            </button>
          </div>
        )}

        {notification && (
          <div className="mt-4 text-center text-lg font-semibold text-green-600">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
