"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaUsers, FaRocket, FaBrain } from "react-icons/fa";
import { useTheme } from "../../Context/ThemeContext";

const benefits = [
  {
    icon: FaLightbulb,
    color: "text-yellow-500",
    title: "Gain Insight",
    description:
      "Understand life’s challenges and make better decisions through experience and reflection.",
  },
  {
    icon: FaUsers,
    color: "text-blue-500",
    title: "Improve Relationships",
    description:
      "Learn from interactions and experiences to communicate effectively and build meaningful connections.",
  },
  {
    icon: FaRocket,
    color: "text-red-500",
    title: "Boost Personal Growth",
    description:
      "Discover opportunities for self-improvement and unlock your full potential over time.",
  },
  {
    icon: FaBrain,
    color: "text-green-500",
    title: "Enhance Problem Solving",
    description:
      "Learn strategies to tackle challenges efficiently and develop critical thinking skills.",
  },
];

const iconVariants = {
  float: {
    y: [0, -10, 0],
    rotate: [0, 10, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: { duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
};

export default function WhyLearningSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section className={`${isLight ? "bg-gray-50" : "bg-gray-900"} py-16`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-slide">
          Why Learning From Life Matters
        </h2>
        <p className={`${isLight ? "text-gray-600" : "text-gray-300"} mb-12 max-w-2xl mx-auto`}>
          Life is the best teacher. Understanding its lessons can help you grow, make informed decisions, and lead a more fulfilling life.
        </p>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className={`rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-300 ${
                  isLight
                    ? "bg-white shadow-lg hover:scale-105 hover:shadow-2xl"
                    : "bg-gray-800 shadow-md hover:scale-105 hover:shadow-xl"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Animated Icon */}
                <motion.div
                  className={`${benefit.color} ${isLight ? "" : "drop-shadow-md"} mb-4`}
                  variants={iconVariants}
                  animate="float"
                >
                  <IconComponent size={36} />
                </motion.div>

                <h3 className={`${isLight ? "text-gray-900" : "text-gray-100"} text-xl font-semibold mb-2`}>
                  {benefit.title}
                </h3>
                <p className={`${isLight ? "text-gray-600" : "text-gray-300"} text-sm`}>
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
