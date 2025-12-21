'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { MdLockOutline, MdLockOpen } from 'react-icons/md';
import { useTheme } from '../Context/ThemeContext';
import { useNavigate, useLocation } from 'react-router';
import SecondaryButton from '../Components/ui/SecondaryButton';
import toast, { Toaster } from 'react-hot-toast';

import { auth } from '../Firebase/firebase config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../Context/AuthContext';
import api from '../Utils/app'; 

export default function LoginPage() {
  const { theme } = useTheme();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLight = theme === 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hoverLock, setHoverLock] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: [0, 8, -8, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    });
  }, [controls]);

  const inputClass = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
    isLight ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-600 bg-gray-700 text-gray-200'
  }`;

  // --------------------------
  // LOGIN FUNCTION
  // --------------------------
const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) return toast.error("Email & Password required!");

  try {
    
    await signInWithEmailAndPassword(auth, email, password);
    
   
    
    toast.success("Login successful!");
    const redirectTo = location.state?.from || '/';
    navigate(redirectTo, { replace: true });
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

  // --------------------------
  // GOOGLE LOGIN
  // --------------------------
  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    
    const result = await signInWithPopup(auth, provider);
    
    if (result?.user) {
      toast.success("Google Login Successful!");
      navigate('/', { replace: true });
    }
  } catch (error) {
    
    if (error.code === 'auth/popup-closed-by-user') {
       toast.error("Login cancelled by user");
    } else {
       console.error(error);
       toast.error(error.message);
    }
  }
};

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isLight ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-xl shadow-2xl ${isLight ? 'bg-white' : 'bg-gray-800'}`}
      >
        {/* Animated Lock Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.3 }}
            onHoverStart={() => setHoverLock(true)}
            onHoverEnd={() => setHoverLock(false)}
            className="text-blue-500"
          >
            {hoverLock ? <MdLockOpen className="w-16 h-16" /> : <MdLockOutline className="w-16 h-16" />}
          </motion.div>
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold text-center mb-6 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
          Welcome Back
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            whileFocus={{ scale: 1.02 }}
          />

          <div className="flex justify-between text-sm">
            <button
              type="button"
              className={`hover:underline ${isLight ? 'text-blue-600' : 'text-blue-400'}`}
              onClick={() => navigate('/forget-password')}
            >
              Forgot Password?
            </button>

            <button
              type="button"
              className={`hover:underline ${isLight ? 'text-blue-600' : 'text-blue-400'}`}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>

          <SecondaryButton type="submit" className="w-full mt-2">
            Login
          </SecondaryButton>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Login */}
        <motion.button
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg border shadow-md hover:shadow-lg transition-all duration-200 space-x-3 ${
            isLight ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'
          }`}
        >
          <FcGoogle size={24} />
          <span className={isLight ? 'text-gray-800 font-medium' : 'text-gray-200 font-medium'}>
            Continue with Google
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
