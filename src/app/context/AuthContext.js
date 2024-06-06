"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase";
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firebaseUser, setFirebaseUser] = useState(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error('Error signing in with Google', error);
        }
    };

    const logout = async () => {
      try {
        await signOut(auth);
        setFirebaseUser(null);
    } catch (error) {
        console.error('Error signing out', error);
    }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          setFirebaseUser(firebaseUser); 
          if (firebaseUser) {
            try {
              const token = await firebaseUser.getIdToken();
              const response = await axios.post('/api/auth', { token });
              setUser(response.data);
            } catch (error) {
              console.error('Error authenticating with server', error);
            }
          } else {
            setUser(null);
          }
          setLoading(false);
        });
    
        return () => unsubscribe();
    }, []);

    return (
    <AuthContext.Provider value={{user, firebaseUser, loading, googleSignIn, logout}}>{ children }</AuthContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(AuthContext);
};