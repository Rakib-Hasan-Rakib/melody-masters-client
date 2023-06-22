import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post("https://melody-masters-server.vercel.app/jwt", {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("jwt-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("jwt-token");
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    googleLogin,
    createUser,
    loginUser,
    logOutUser,
    updateUserInfo,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
