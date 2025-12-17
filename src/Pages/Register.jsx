'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { MdPersonAdd, MdEmail, MdLockOutline } from 'react-icons/md';
import { useTheme } from '../Context/ThemeContext';
import { useNavigate, useLocation } from 'react-router';
import SecondaryButton from '../Components/ui/SecondaryButton';
import toast, { Toaster } from 'react-hot-toast';

import { auth } from '../Firebase/firebase config';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import { useAuth } from '../Context/AuthContext';
import api from '../Utils/app'; 

export default function RegisterPage() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLight = theme === 'light';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [hoverIcon, setHoverIcon] = useState(false);

  const [passValid, setPassValid] = useState({
    upper: false,
    lower: false,
    length: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: [0, 10, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    });
  }, [controls]);

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPassValid({
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      length: value.length >= 6,
    });
  };

  // --------------------------
  // REGISTER FUNCTION
  // --------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('All fields are required!');
      return;
    }
    if (!passValid.upper || !passValid.lower || !passValid.length) {
      return toast.error("Password doesn't meet all requirements!");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || '',
      });

      const token = await userCredential.user.getIdToken();

      // Send token to backend to sync/create user
      const res = await api.post('/users', { token });

      login(res.data);

      toast.success('Account created successfully!');

      setName('');
      setEmail('');
      setPhotoURL('');
      setPassword('');
      setPassValid({ upper: false, lower: false, length: false });

      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);

    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // --------------------------
  // GOOGLE REGISTER/LOGIN
  // --------------------------
  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      const res = await api.post('/users', { token });
      login(res.data);

      toast.success('Google login successful!');
      navigate('/');

    } catch (error) {
      toast.error(error.message);
      console.error(error);
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
        <div className="flex justify-center mb-6">
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.3 }}
            onHoverStart={() => setHoverIcon(true)}
            onHoverEnd={() => setHoverIcon(false)}
            className="text-green-500"
          >
            <MdPersonAdd className="w-16 h-16" />
          </motion.div>
        </div>

        <h2 className={`text-2xl font-bold text-center mb-6 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <motion.div className="relative">
            <MdPersonAdd className="absolute left-3 top-3 text-gray-400" size={24} />
            <motion.input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full pl-12 px-4 py-3 rounded-lg border ${
                isLight ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-600 bg-gray-700 text-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Email */}
          <motion.div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400" size={24} />
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-12 px-4 py-3 rounded-lg border ${
                isLight ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-600 bg-gray-700 text-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Photo URL */}
          <motion.div className="relative">
            <MdPersonAdd className="absolute left-3 top-3 text-gray-400" size={24} />
            <motion.input
              type="text"
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className={`w-full pl-12 px-4 py-3 rounded-lg border ${
                isLight ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-600 bg-gray-700 text-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Password */}
          <motion.div className="relative">
            <MdLockOutline className="absolute left-3 top-3 text-gray-400" size={24} />
            <motion.input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={`w-full pl-12 px-4 py-3 rounded-lg border ${
                isLight ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-600 bg-gray-700 text-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Live Password Validation */}
          <div className="mt-1 space-y-1 text-sm">
            <p className={`${passValid.upper ? 'text-green-500' : 'text-red-500'}`}>
              {passValid.upper ? '✓' : '✗'} At least one uppercase letter
            </p>
            <p className={`${passValid.lower ? 'text-green-500' : 'text-red-500'}`}>
              {passValid.lower ? '✓' : '✗'} At least one lowercase letter
            </p>
            <p className={`${passValid.length ? 'text-green-500' : 'text-red-500'}`}>
              {passValid.length ? '✓' : '✗'} Minimum 6 characters
            </p>
          </div>

          <div className="flex justify-end text-sm">
            <button
              type="button"
              className={`hover:underline ${isLight ? 'text-green-600' : 'text-green-400'}`}
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </button>
          </div>

          <SecondaryButton type="submit" className="w-full mt-2">
            Register
          </SecondaryButton>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        <motion.button
          onClick={handleGoogleRegister}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg border ${
            isLight ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'
          } shadow-md hover:shadow-lg transition-all duration-200 space-x-3`}
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
