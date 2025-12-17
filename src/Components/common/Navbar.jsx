import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";

import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const protectedNavigate = (path) => {
    if (!user) return handleNavigate("/login");
    handleNavigate(path);
  };

  const linkStyle = ({ isActive }) =>
    `transition-all duration-200 ${
      isActive
        ? "text-blue-500 font-bold"
        : theme === "light"
        ? "text-gray-700 hover:text-blue-600"
        : "text-gray-200 hover:text-blue-400"
    }`;

  // Reusable Nav Item
  const NavItem = ({ to, onClick, children }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        {to ? (
          <NavLink to={to} className={linkStyle}>
            {children}
          </NavLink>
        ) : (
          <button onClick={onClick} className="hover:text-blue-500 transition-colors">
            {children}
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <header
      
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-300 border-b ${
        theme === "light" 
          ? "bg-white/90 backdrop-blur-md border-gray-200 text-gray-700 shadow-sm" 
          : "bg-gray-900/90 backdrop-blur-md border-gray-800 text-gray-200 shadow-xl"
      }`}
    >
      {/* Main Container */}
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavItem to="/">Home</NavItem>
          <NavItem onClick={() => protectedNavigate("/dashboard/add-lesson")}>Add Lesson</NavItem>
          <NavItem onClick={() => protectedNavigate("/dashboard/my-lessons")}>My Lessons</NavItem>
          <NavItem to="/lessons">Public Lessons</NavItem>
          <NavItem onClick={() => protectedNavigate("/upgrade")}>Upgrade</NavItem>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-800"}`}
            whileHover={{ rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
          </motion.button>

          {/* User Auth Section */}
          <div className="hidden md:block">
            {!user ? (
              <Button onClick={() => navigate("/login")}>Login / Sign Up</Button>
            ) : (
              <div className="relative">
                <motion.img
                  src={user.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 object-cover"
                  alt="avatar"
                  whileHover={{ scale: 1.1 }}
                />
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 mt-3 w-56 rounded-xl p-4 shadow-2xl border flex flex-col space-y-2 ${
                        theme === "light" ? "bg-white border-gray-100" : "bg-gray-800 border-gray-700"
                      }`}
                    >
                      <p className="font-semibold text-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        {user.displayName || user.name || "User"}
                      </p>
                      <Button onClick={() => handleNavigate("/dashboard/profile")}>Profile</Button>
                      <Button onClick={() => handleNavigate("/dashboard")}>Dashboard</Button>
                      <Button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white">Logout</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden border-t overflow-hidden ${
              theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-800"
            }`}
          >
            <div className="flex flex-col p-6 space-y-4">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={linkStyle}>Home</NavLink>
              <button onClick={() => protectedNavigate("/dashboard/add-lesson")} className="text-left py-2">Add Lesson</button>
              <button onClick={() => protectedNavigate("/dashboard/my-lessons")} className="text-left py-2">My Lessons</button>
              <NavLink to="/lessons" onClick={() => setMobileMenuOpen(false)} className={linkStyle}>Public Lessons</NavLink>
              <button onClick={() => protectedNavigate("/upgrade")} className="text-left py-2 text-blue-500 font-semibold">Upgrade</button>

              {!user ? (
                <Button onClick={() => handleNavigate("/login")}>Login / Sign Up</Button>
              ) : (
                <div className={`mt-4 p-4 rounded-xl border ${theme === "light" ? "bg-gray-50" : "bg-gray-800 border-gray-700"}`}>
                  <p className="font-bold mb-3">{user.name || "User"}</p>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => handleNavigate("/dashboard/profile")}>Profile</Button>
                    <Button onClick={logout} className="bg-red-600 text-white">Logout</Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
     

    </header>
  );
}