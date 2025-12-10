// src/Components/ui/SecondaryButton.jsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function SecondaryButton({ children, className = '', ...props }) {
  return (
    <motion.button
      {...props}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative inline-block px-6 py-3 font-medium rounded-lg text-white
        overflow-hidden group
        transition-all duration-500
        ${className}
      `}
      style={{
        background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #facc15)',
        backgroundSize: '200% 100%',
        animation: 'gradientShift 3s linear infinite',
      }}
    >
      <span className="relative z-10">{children}</span>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.button>
  );
}
