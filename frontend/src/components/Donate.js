import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaPaypal, FaCreditCard, FaApplePay } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const presetAmounts = [10, 20, 50, 100];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission logic here
    const donationData = {
      amount: amount || customAmount,
      paymentMethod,
      donorName,
      email,
      message,
      isRecurring,
    };
    console.log("Donation Data:", donationData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
          Support Our Cause
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {/* Donation Amount Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Select Donation Amount
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`p-3 rounded-lg border-2 ${
                    amount === amt
                      ? "bg-green-500 text-white border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount("");
                }}
                placeholder="Enter custom amount"
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
              <span className="absolute right-3 top-3 text-gray-400">USD</span>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer ${
                  paymentMethod === "creditCard"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("creditCard")}
              >
                <FaCreditCard className="text-3xl mb-2" />
                <span>Credit/Debit Card</span>
                <div className="flex gap-2 mt-2">
                  <span className="text-gray-500">Visa</span>
                  <span className="text-gray-500">Mastercard</span>
                  <span className="text-gray-500">Amex</span>
                </div>
              </div>
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer ${
                  paymentMethod === "paypal"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <FaPaypal className="text-3xl mb-2 text-blue-600" />
                <span>PayPal</span>
              </div>
            </div>
          </div>

          {/* Donor Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
              required
            />
            <textarea
              placeholder="Optional Message (max 200 characters)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg"
              maxLength={200}
            />
          </div>

          {/* Recurring Donation */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="mr-2 w-4 h-4"
            />
            <span className="text-gray-700">
              Make this a monthly recurring donation
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Donate {isRecurring ? "Monthly" : "Now"} - ${amount || customAmount}
          </button>
        </form>

        {/* Security Assurance */}
        <div className="mt-6 text-center text-gray-600">
          <p className="mb-2">Secure payment processing</p>
          <div className="flex justify-center items-center gap-4">
            <FaApplePay className="text-2xl" />
            <SiGooglepay className="text-2xl" />
            <FaPaypal className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
