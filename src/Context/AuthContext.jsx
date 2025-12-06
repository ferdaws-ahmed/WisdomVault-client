import { createContext, useContext, useEffect, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      
  const [loading, setLoading] = useState(true); 

  // On mount, load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // LOGIN function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // LOGOUT function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  // Optionally, show nothing while loading
  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export default AuthProvider;
