import React, { useContext, useEffect, useState } from "react";
import "../firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut as logOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(!false);
  const [user, setUser] = useState({});

  //authState change reader
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe; // follow this convention like store in variable and return it, it will prevent the memory leak.
  }, []);

  //signUp function
  async function signUp(username, email, password) {
    const auth = getAuth();

    //createUser
    await createUserWithEmailAndPassword(auth, email, password);

    //updateProfile
    await updateProfile(auth.currentUser, { displayName: username });

    //update updatedData to local states
    const user = auth.currentUser;
    setUser({
      ...user,
    });
  }

  //signUp function
  async function signIn(email, password) {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password);
  }

  //signOut function
  async function signOut() {
    const auth = getAuth();

    await logOut(auth);
  }

  const value = {
    user,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
