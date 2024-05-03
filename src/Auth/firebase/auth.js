// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import getDatabase for Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7wwy7XvW6O2bheemq-A-uIdx7R8Drpis",
  authDomain: "kidney-swap-program.firebaseapp.com",
  projectId: "kidney-swap-program",
  storageBucket: "kidney-swap-program.appspot.com",
  messagingSenderId: "700901861817",
  appId: "1:700901861817:web:29a21c0edf069c1603ee68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize Realtime Database with the Firebase app

export { app, auth, database }; // Export database reference for use in other parts of your application
