// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR9Bv4GTkQbjNqZqjyX2-ZA5tJdnQ8izQ",
  authDomain: "sih-hackathon-892b2.firebaseapp.com",
  projectId: "sih-hackathon-892b2",
  storageBucket: "sih-hackathon-892b2.firebasestorage.app",
  messagingSenderId: "427232990276",
  appId: "1:427232990276:web:bd2066c954e3102d33d811",
  measurementId: "G-RK9S1L3K9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export { app };
