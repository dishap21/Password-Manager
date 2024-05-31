import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2ruQDEiUpEtTlRURjt8Ly8zkGFajvZWA",
  authDomain: "passguard-3e034.firebaseapp.com",
  projectId: "passguard-3e034",
  storageBucket: "passguard-3e034.appspot.com",
  messagingSenderId: "891475438594",
  appId: "1:891475438594:web:d26f78ce34e3b483a3cb1b",
  measurementId: "G-6SSCDFR74Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };