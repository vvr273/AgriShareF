import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../utills/api";  // Import API function

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await forgotPassword(email); // Call forgotPassword API
      setMessage(data.message);
      // Store the user's email in localStorage
      localStorage.setItem("email", email);
      navigate("/ResetPassword");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email to get a password reset code.
        </p>
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{message}</div>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="yourname@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;