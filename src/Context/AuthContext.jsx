import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase config";
import { signOut } from "firebase/auth";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage initially
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
        setToken(idToken);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", idToken);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // LOGIN
  const login = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();
    const userData = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
    };
    setUser(userData);
    setToken(idToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", idToken);
  };

  // LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase signout error:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  // Optional: render a spinner or skeleton while loading
  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
