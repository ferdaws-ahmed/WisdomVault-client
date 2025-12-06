import React from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
        boxShadow: "0px 8px 20px rgba(59,130,246,0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative overflow-hidden flex items-center gap-2 px-5 py-2 rounded-xl
        text-white font-semibold shadow-md
        transition-all duration-300 transform
        hover:-translate-y-1 active:scale-95
        ${className}
      `}
      {...props}
    >
      {/* Liquid background layer */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradientBackground"
        style={{
          backgroundSize: "200% 200%",
          zIndex: 0,
          filter: "brightness(1.1)",
        }}
      ></span>

      {/* Content */}
      <span className="relative flex items-center gap-2 z-10">
        {Icon && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-5 h-5" />
          </motion.span>
        )}
        {children}
      </span>

      {/* Gradient animation */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradientBackground {
          animation: gradientMove 5s ease infinite;
        }
      `}</style>
    </motion.button>
  );
}
