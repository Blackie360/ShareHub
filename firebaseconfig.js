// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; // Add this import for Firestore


const firebaseConfig = {
  apiKey: "AIzaSyCWEgFCFj-E_AoIGMoUum-_l6XkELuqYuw",
  authDomain: "sharehub-dab7b.firebaseapp.com",
  projectId: "sharehub-dab7b",
  storageBucket: "sharehub-dab7b.appspot.com",
  messagingSenderId: "753341972235",
  appId: "1:753341972235:web:b479e6d5d75481db982c0e",
  measurementId: "G-XY7SXZV6FB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
