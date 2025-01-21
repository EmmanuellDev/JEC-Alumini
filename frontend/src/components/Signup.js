import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import STD from "../imgs/student.jpg";
import JEC from "../imgs/jec-logo.png";
import BG from "../imgs/jec-bg.jpeg";

const AlumniSignup = () => {
  const [session, setSession] = useState(1);
  const navigate = useNavigate();

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
    gradYear: "",
    convocationYear: "",
    regNumber: "",
    employed: "",
    photo: null,
  });
  const [captchaGenerated, setCaptchaGenerated] = useState(generateCaptcha());
  const [captchaStatus, setCaptchaStatus] = useState("");

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const handleCaptchaCheck = () => {
    if (formData.enteredCaptcha === captchaGenerated) {
      setCaptchaStatus("Captcha Matched");
    } else {
      setCaptchaStatus("Captcha Incorrect");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const redirectToLogin = () => {
    navigate('/login');  // Redirects to the login page
  };

  const handleNext = () => {
    if (session === 1) {
      if (
        formData.email &&
        formData.confirmEmail &&
        formData.enteredCaptcha === captchaGenerated
      ) {
        setSession(2);
      } else {
        alert("Please complete all fields correctly.");
      }
    } else if (session === 2) {
      const { firstName, lastName, gender, dob, mobile, location, password, confirmPassword } = formData;
      if (
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
      ) {
        setSession(3);
      } else {
        alert("Please complete all fields correctly.");
      }
    }
  };

  const handleSubmit = () => {
    const { branch, gradYear, convocationYear, regNumber, employed, photo } = formData;
    if (branch && gradYear && convocationYear && regNumber && employed && photo) {
      alert("Registration Successful");
      navigate("/dashboard");
    } else {
      alert("Failed to Register. Please complete all fields.");
    }
  };

  const inputClassName = "w-full mb-4 p-3 border-2 border-black rounded bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const selectClassName = "w-full p-3 border-2 border-black rounded bg-white/60 backdrop-blur-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClassName = "bg-gradient-to-r from-white via-blue-400 to-purple-600 hover:border-2 hover:bg-gradient-to-r hover:from-purple-600 hover:via-blue-400 hover:to-white border-2 border-black hover:border-black pb-2 text-black px-6 py-3 rounded w-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full min-h-screen p-6 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      <div className="relative flex flex-col w-full max-w-6xl overflow-hidden rounded-lg shadow-lg bg-white/40 backdrop-blur-md">
        {/* Header with JEC logo spanning full width */}
        <div className="w-full px-0 shadow-sm bg-white/40">
          <img 
            src={JEC} 
            alt="JEC Logo" 
            className="object-cover w-full h-30"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>

        {/* Content container */}
        <div className="flex flex-1">
          {/* Left section with student image */}
          <div className="flex flex-col items-center justify-center w-2/5 p-8 bg-white/30">
            <img src={STD} alt="Student" className="object-contain w-full max-w-md" />
          </div>

          {/* Right section with form */}
          <div className="w-3/5 bg-white/30 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div className="p-8">
          
          {session === 1 && (
                <div className="space-y-4 h-[420px]">
                  <h2 className="mb-6 text-2xl font-bold text-gray-800">Session 1: Email Verification</h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={inputClassName}
              />
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                placeholder="Confirm Email"
                className={inputClassName}
              />
              <div className="flex items-center mb-4">
                <span className="p-3 mr-4 border rounded bg-gray-100/90">{captchaGenerated}</span>
                <button
                  onClick={() => setCaptchaGenerated(generateCaptcha())}
                  className="px-4 py-2 text-white transition-colors rounded bg-gradient-to-r from-blue-400 to-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-400"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                name="enteredCaptcha"
                value={formData.enteredCaptcha}
                onChange={handleInputChange}
                placeholder="Enter Captcha"
                className={inputClassName}
              />
              <button
                onClick={handleCaptchaCheck}
                className="px-4 py-2 text-white transition-colors rounded bg-gradient-to-r from-blue-400 to-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-400"
              >
                Check Captcha
              </button>
              {captchaStatus && <p className="mt-2 text-sm text-green-500">{captchaStatus}</p>}
              <button onClick={handleNext} className={buttonClassName}>
                Next
              </button>

              <p>Already a member? <button onClick={redirectToLogin} className="text-blue-500 underline">Login</button></p>
            </div>
          )}

          {session === 2 && (
                <div className="space-y-4 h-[420px]">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Session 2: Personal Details</h2>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className={inputClassName}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className={inputClassName}
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={selectClassName}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={inputClassName}
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                className={inputClassName}
              />
              <input
                type="text"
                name="country"
                value={formData.location.country}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, country: e.target.value },
                  }))
                }
                placeholder="Country"
                className={inputClassName}
              />
              <input
                type="text"
                name="state"
                value={formData.location.state}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, state: e.target.value },
                  }))
                }
                placeholder="State"
                className={inputClassName}
              />
              <input
                type="text"
                name="city"
                value={formData.location.city}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, city: e.target.value },
                  }))
                }
                placeholder="City"
                className={inputClassName}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={inputClassName}
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className={inputClassName}
              />
              <button onClick={handleNext} className={buttonClassName}>
                Next
              </button>
            </div>
          )}

          {session === 3 && (
                <div className="space-y-4 h-[420px]">
                  <h2 className="mb-6 text-2xl font-bold text-gray-800">Session 3: Academic Details</h2>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className={selectClassName}
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="Mech">Mech</option>
              </select>
              <input
                type="text"
                name="gradYear"
                value={formData.gradYear}
                onChange={handleInputChange}
                placeholder="Graduation Year"
                className={inputClassName}
              />
              <input
                type="text"
                name="convocationYear"
                value={formData.convocationYear}
                onChange={handleInputChange}
                placeholder="Convocation Year"
                className={inputClassName}
              />
              <input
                type="text"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleInputChange}
                placeholder="University Register Number"
                className={inputClassName}
              />
              <select
                name="employed"
                value={formData.employed}
                onChange={handleInputChange}
                className={selectClassName}
              >
                <option value="">Are you presently employed?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }))
                  }
                  className="w-full p-2 border rounded bg-white/80 backdrop-blur-sm"
                  accept="image/*"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 mt-6 text-black transition-colors border-2 border-black rounded bg-gradient-to-r from-white via-blue-400 to-purple-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniSignup;