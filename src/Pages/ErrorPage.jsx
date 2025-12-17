import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-lg w-full"
      >

        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: [ -10, 10, -10 ] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <AlertTriangle size={80} className="text-red-500" />
        </motion.div>

        <h1 className="text-5xl font-bold text-white mb-4">404</h1>

        <p className="text-gray-300 text-lg mb-6">
          Oops! The page you are looking for doesn't exist.
        </p>

        {/* Back Home Btn */}
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-lg font-medium shadow-lg"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
