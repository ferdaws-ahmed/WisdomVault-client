import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase config";
import axios from "axios";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";

// Axios Instance
const api = axios.create({
  baseURL: "http://localhost:3000",
});

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();

          await api.post("/users", {}, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const res = await api.get(`/users/status/${firebaseUser.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || "Anonymous",
            photoURL: firebaseUser.photoURL,
            role: res.data.role || "user",
            isPremium: res.data.isPremium || false,
            token,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth Error:", error.response?.status, error.message);
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            role: "user",
          });
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };


  
const updateUser = async ({ displayName, photoURL }) => {
  setUser((prev) => ({
    ...prev,
    name: displayName ?? prev?.name,
    photoURL: photoURL ?? prev?.photoURL,
  }));

  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
    } catch (err) {
      console.error("Firebase profile update failed", err);
    }
  }
};






  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
