// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVePObFiT1WiFXXRH0_anxMkq7ACcUQCI",
  authDomain: "nivel-madurez.firebaseapp.com",
  projectId: "nivel-madurez",
  storageBucket: "nivel-madurez.firebasestorage.app",
  messagingSenderId: "1070828648969",
  appId: "1:1070828648969:web:cca8d6f1a85bdf423c16d8",
  measurementId: "G-4C51HSLFTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore instance
export { db };