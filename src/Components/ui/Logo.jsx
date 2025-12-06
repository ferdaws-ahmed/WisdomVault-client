import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const letters = "WisdomVault".split("");

  const lightGradient =
    "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #facc15)";
  const darkGradient =
    "linear-gradient(90deg, #06b6d4, #a78bfa, #f472b6, #f97316)";

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center justify-center cursor-pointer select-none space-x-0.5 sm:space-x-1"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -4, 2, 0], // subtle wave
            opacity: [0, 1, 1, 1],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{
            duration: 3, 
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.1,
            ease: "easeInOut",
          }}
          className="font-extrabold text-transparent bg-clip-text relative
            text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          style={{
            backgroundImage: theme === "light" ? lightGradient : darkGradient,
            backgroundSize: "200% 100%",
            animation: "gradientShift 12s linear infinite",
            textShadow: pulse
              ? "0 0 6px rgba(255,255,255,0.2), 0 0 12px rgba(255,255,255,0.1)"
              : "none",
          }}
        >
          {letter}
        </motion.span>
      ))}

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
