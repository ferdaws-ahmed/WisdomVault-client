'use client';
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase config"; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTheme } from "../Context/ThemeContext";
import SecondaryButton from "../Components/ui/SecondaryButton";

export default function ForgetPassword() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent! Check your email.");
      setEmail("");
      navigate("/login"); 
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-300
      ${theme === "light" ? "bg-gray-50 text-gray-800" : "bg-gray-900 text-gray-100"}
    `}>
      <div className={`w-full max-w-md p-6 rounded-xl shadow-lg transition-colors duration-300
        ${theme === "light" ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"}
      `}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Your Password
        </h2>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
          Enter your email and we'll send you a password reset link.
        </p>

        <form onSubmit={handleReset} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
              ${theme === "light" ? "border-gray-300 bg-white text-gray-800" : "border-gray-600 bg-gray-700 text-gray-100"}
            `}
          />

          <SecondaryButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </SecondaryButton>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
