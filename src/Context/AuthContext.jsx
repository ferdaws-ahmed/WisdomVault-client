import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase config";
import axios from "axios";
import { signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 

const api = axios.create({
  baseURL: "https://wisdomvaultserver.vercel.app/",
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
          const token = await firebaseUser.getIdToken(true);

     
          await api.post("/users", 
            { name: firebaseUser.displayName }, 
            { headers: { Authorization: `Bearer ${token}` } }
          );

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
        console.error("Auth Sync Error:", error.response?.status, error.message);
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: "user",
          });
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);


 
  const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  setLoading(true);
  return signInWithPopup(auth, provider);
};

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateUser = async ({ displayName, photoURL }) => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName || auth.currentUser.displayName,
        photoURL: photoURL || auth.currentUser.photoURL,
      });

      setUser((prev) => ({
        ...prev,
        name: displayName || prev?.name,
        photoURL: photoURL || prev?.photoURL,
      }));

      return true;
    } catch (err) {
      console.error("Profile update failed in context:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser, updateUser,googleLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;