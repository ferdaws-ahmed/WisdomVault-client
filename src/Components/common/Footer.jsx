import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import Logo from "../ui/Logo";

// Simple fade animation
const fade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
      }}
      className={`w-full mt-20 border-t ${
        isLight ? "bg-gray-100 border-gray-300" : "bg-gray-900 border-gray-700"
      }`}
    >
      {/* Main Container */}
      <div className="max-w-screen-2xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* 1. Logo + Website Name */}
        <motion.div variants={fade} className="space-y-3">
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Logo small /> {/* Small version from Navbar animation */}
          </motion.div>

          <p
            className={`text-sm leading-relaxed ${
              isLight ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Your vault of high-quality digital lessons, tutorials & tech guides.
          </p>
        </motion.div>

        {/* 2. Contact Info */}
        <motion.div variants={fade}>
          <h4
            className={`font-semibold text-lg mb-3 ${
              isLight ? "text-gray-800" : "text-white"
            }`}
          >
            Contact Info
          </h4>

          <ul className="space-y-2 text-sm">
            <li className={isLight ? "text-gray-600" : "text-gray-400"}>
              Email: contact@wisdomvault.com
            </li>
            <li className={isLight ? "text-gray-600" : "text-gray-400"}>
              Support: support@wisdomvault.com
            </li>
            <li className={isLight ? "text-gray-600" : "text-gray-400"}>
              Phone: +880 1234 567890
            </li>
          </ul>
        </motion.div>

        {/* 3. Terms & Policies */}
        <motion.div variants={fade}>
          <h4
            className={`font-semibold text-lg mb-3 ${
              isLight ? "text-gray-800" : "text-white"
            }`}
          >
            Legal
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <NavLink
                to="/terms"
                className={`hover:underline ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Terms & Conditions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className={`hover:underline ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </motion.div>

        {/* 4. Social Media */}
        <motion.div variants={fade}>
          <h4
            className={`font-semibold text-lg mb-3 ${
              isLight ? "text-gray-800" : "text-white"
            }`}
          >
            Follow Us
          </h4>

          <div className="flex space-x-4">
  {/* Social Links */}
  <motion.a
    whileHover={{ y: -4, scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
    href="mailto:contact@wisdomvault.com" // Email
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full border ${
      isLight
        ? "border-gray-400 text-gray-700 hover:bg-gray-200"
        : "border-gray-600 text-gray-300 hover:bg-gray-800"
    }`}
  >
    <Mail size={18} />
  </motion.a>

  <motion.a
    whileHover={{ y: -4, scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full border ${
      isLight
        ? "border-gray-400 text-gray-700 hover:bg-gray-200"
        : "border-gray-600 text-gray-300 hover:bg-gray-800"
    }`}
  >
    <Facebook size={18} />
  </motion.a>

  <motion.a
    whileHover={{ y: -4, scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
    href="https://twitter.com/"
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full border ${
      isLight
        ? "border-gray-400 text-gray-700 hover:bg-gray-200"
        : "border-gray-600 text-gray-300 hover:bg-gray-800"
    }`}
  >
    <Twitter size={18} />
  </motion.a>

  <motion.a
    whileHover={{ y: -4, scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
    href="https://www.linkedin.com/in/"
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full border ${
      isLight
        ? "border-gray-400 text-gray-700 hover:bg-gray-200"
        : "border-gray-600 text-gray-300 hover:bg-gray-800"
    }`}
  >
    <Linkedin size={18} />
  </motion.a>
</div>

        </motion.div>
      </div>

      {/* Bottom Copy Section */}
      <div
        className={`py-4 text-center text-xs border-t ${
          isLight ? "border-gray-300 text-gray-600" : "border-gray-700 text-gray-400"
        }`}
      >
        © {new Date().getFullYear()} WisdomVault — All rights reserved.
      </div>
    </motion.footer>
  );
}
