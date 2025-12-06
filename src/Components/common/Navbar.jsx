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
    isActive
      ? "text-blue-500 font-bold transition-all"
      : theme === "light"
      ? "hover:text-blue-600 transition-colors duration-200"
      : "hover:text-blue-400 transition-colors duration-200";

  
  const NavItem = ({ to, onClick, children }) => {
    const isNavLink = to !== undefined;
    const Component = isNavLink ? NavLink : motion.button;
    
    
    const getClassName = (props) => isNavLink ? linkStyle(props) : linkStyle({});

    return (
        <motion.div
            whileHover={{ scale: 1.05, textShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block"
        >
            <Component
                to={to}
                onClick={onClick}
                
                className={isNavLink ? getClassName : getClassName} 
            >
                {children}
            </Component>
        </motion.div>
    );
  };

  return (
    <header
  className={`sticky top-0 z-50 transition-colors duration-500 w-full
    ${theme === "light" ? "bg-white text-gray-700 shadow-md" : "bg-gray-900 text-gray-200 shadow-xl"}
  `}
>
  {/* Main Container */}
  <div
    className={`flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8
      ${mobileMenuOpen ? "w-full" : "max-w-screen-2xl mx-auto"}
    `}
  >
    {/* Logo */}
    <Logo />

    {/* Desktop Navigation */}
    <motion.nav className="hidden md:flex items-center space-x-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
      <NavItem to="/">Home</NavItem>
      <NavItem onClick={() => protectedNavigate("/dashboard/add-lesson")}>Add Lesson</NavItem>
      <NavItem onClick={() => protectedNavigate("/dashboard/my-lessons")}>My Lessons</NavItem>
      <NavItem to="/lessons">Public Lessons</NavItem>
      <NavItem onClick={() => protectedNavigate("/upgrade")}>Upgrade</NavItem>
    </motion.nav>

    {/* Right Section */}
    <div className="flex items-center space-x-3">
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-colors duration-300 ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-800"}`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === "light" ? <Moon className="w-5 h-5 text-gray-800" /> : <Sun className="w-5 h-5 text-yellow-400" />}
      </motion.button>

      {/* Desktop Auth */}
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
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className={`absolute right-0 mt-2 w-56 rounded-xl p-4 shadow-2xl border flex flex-col space-y-2
                    ${theme === "light" ? "bg-white border-gray-200 text-gray-700" : "bg-gray-800 border-gray-700 text-gray-200"}
                  `}
                >
                  <p className="font-semibold text-center pb-2 border-b">{user.displayName || user.email || "User"}</p>
                  <Button onClick={() => handleNavigate("/dashboard/profile")}>Profile</Button>
                  <Button onClick={() => handleNavigate("/dashboard")}>Dashboard</Button>
                  <Button onClick={logout} className="bg-red-600 hover:bg-red-700">Logout</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`md:hidden w-full overflow-hidden transition-colors duration-300
          ${theme === "light" ? "bg-gray-50 text-gray-700" : "bg-gray-900 text-gray-200"}
        `}
      >
        <div className="flex flex-col px-6 py-4 space-y-3 w-full">
          <NavLink onClick={() => handleNavigate("/")} to="/" className={linkStyle}>Home</NavLink>
          <button onClick={() => protectedNavigate("/dashboard/add-lesson")} className={linkStyle}>Add Lesson</button>
          <button onClick={() => protectedNavigate("/dashboard/my-lessons")} className={linkStyle}>My Lessons</button>
          <NavLink onClick={() => handleNavigate("/lessons")} to="/lessons" className={linkStyle}>Public Lessons</NavLink>
          <button onClick={() => protectedNavigate("/upgrade")} className={linkStyle}>Upgrade</button>

          {!user ? (
            <Button onClick={() => handleNavigate("/login")}>Login / Sign Up</Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className={`flex flex-col mt-4 p-3 rounded-xl border space-y-2
                ${theme === "light" ? "bg-white border-gray-200 text-gray-700" : "bg-gray-800 border-gray-700 text-gray-200"}
              `}
            >
              <p className="font-semibold">{user.displayName || user.email || "User"}</p>
              <Button onClick={() => handleNavigate("/dashboard/profile")}>Profile</Button>
              <Button onClick={() => handleNavigate("/dashboard")}>Dashboard</Button>
              <Button onClick={logout} className="bg-red-600 hover:bg-red-700">Logout</Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</header>

  );
}