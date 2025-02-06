import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import Navbar from "./Navbar";

export default function GenerateID() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const handleDownload = async () => {
    if (!userId) {
      setError("Please enter your User ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/generate-id/${userId}`,
        {
          responseType: "blob",
        }
      );
      saveAs(response.data, "e-ID-Card.pdf");
    } catch (error) {
      setError("Error generating ID card. Please check your User ID.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="max-w-[90rem] ml-[15%] min-h-[48rem] pt-48 bg-gray-50 py-12 px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200">
            <div className="text-center p-6">
              {/* Icon placeholder - you can replace with an actual icon */}
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Generate Your e-ID Card
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your User ID to generate and download your digital ID card
              </p>
            </div>

            <div className="px-6 pb-6">
              <div className="space-y-4">
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter Your User ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Generate and Download your e-ID
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
