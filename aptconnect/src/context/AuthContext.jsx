// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // onAuthStateChanged listener
  useEffect(() => {
    let mounted = true;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!mounted) return;
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const reloadUser = useCallback(() => {
    // Re-read the current user from firebase auth
    setUser(auth.currentUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, reloadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
