import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import STD from "../imgs/student.jpg";
import JEC from "../imgs/jec-logo.png";
import BG from "../imgs/jec-bg.jpeg";

const AlumniSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    mobile: "",
    location: { country: "", state: "", city: "" },
    branch: "",
    gradYear: "",
    convocationYear: "",
    regNumber: "",
    employed: "",
    proof: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formToSend = new FormData();
    // Append all the form data
    formToSend.append("email", formData.email);
    formToSend.append("password", formData.password);
    formToSend.append("firstName", formData.firstName);
    formToSend.append("lastName", formData.lastName);
    formToSend.append("gender", formData.gender);
    formToSend.append("dob", formData.dob);
    formToSend.append("mobile", formData.mobile);
    formToSend.append("location[country]", formData.location.country);
    formToSend.append("location[state]", formData.location.state);
    formToSend.append("location[city]", formData.location.city);
    formToSend.append("branch", formData.branch);
    formToSend.append("gradYear", formData.gradYear);
    formToSend.append("convocationYear", formData.convocationYear);
    formToSend.append("regNumber", formData.regNumber);
    formToSend.append("employed", formData.employed);
    formToSend.append("proof", formData.proof);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: formToSend,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Sign-up successful:", data);
        navigate("/dashboard"); // Redirect to a success page after sign-up
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const inputClassName =
    "w-full mb-4 p-3 border-2 border-black rounded bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const selectClassName =
    "w-full p-3 border-2 border-black rounded bg-white/60 backdrop-blur-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClassName =
    "bg-gradient-to-r from-white via-blue-400 to-purple-600 hover:border-2 hover:bg-gradient-to-r hover:from-purple-600 hover:via-blue-400 hover:to-white border-2 border-black hover:border-black pb-2 text-black px-6 py-3 rounded w-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full min-h-screen p-6 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative flex flex-col w-full max-w-6xl overflow-hidden rounded-lg shadow-lg bg-white/40 backdrop-blur-md">
        <div className="w-full px-0 shadow-sm bg-white/40">
          <img
            src={JEC}
            alt="JEC Logo"
            className="object-cover w-full h-30"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div className="flex flex-1">
          <div className="flex flex-col items-center justify-center w-2/5 p-8 bg-white/30">
            <img
              src={STD}
              alt="Student"
              className="object-contain w-full max-w-md"
            />
          </div>

          <div className="w-3/5 bg-white/30 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div className="p-8 space-y-8">
              {/* Session 1 */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold">Session 1: Basic Details</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={inputClassName}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={inputClassName}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute text-gray-600 top-3 right-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={inputClassName}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={inputClassName}
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <select
                  name="gender"
                  className={selectClassName}
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="date"
                  name="dob"
                  className={inputClassName}
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  className={inputClassName}
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>

              {/* Session 2 */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold">
                  Session 2: Education Details
                </h2>
                <input
                  type="text"
                  name="branch"
                  placeholder="Branch"
                  className={inputClassName}
                  value={formData.branch}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="gradYear"
                  placeholder="Graduation Year"
                  className={inputClassName}
                  value={formData.gradYear}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="convocationYear"
                  placeholder="Convocation Year"
                  className={inputClassName}
                  value={formData.convocationYear}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="regNumber"
                  placeholder="Registration Number"
                  className={inputClassName}
                  value={formData.regNumber}
                  onChange={handleInputChange}
                />
                <select
                  name="employed"
                  className={selectClassName}
                  value={formData.employed}
                  onChange={handleInputChange}
                >
                  <option value="">Currently Employed?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Session 3 */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold">Session 3: Upload Proof</h2>
                <input
                  type="file"
                  name="proof"
                  accept="image/*"
                  className={inputClassName}
                  onChange={handleFileChange}
                />
              </div>

              {/* Submit Button */}
              <button onClick={handleSubmit} className={buttonClassName}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniSignup;