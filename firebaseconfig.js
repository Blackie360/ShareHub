// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWEgFCFj-E_AoIGMoUum-_l6XkELuqYuw",
  authDomain: "sharehub-dab7b.firebaseapp.com",
  databaseURL: "https://sharehub-dab7b-default-rtdb.firebaseio.com",
  projectId: "sharehub-dab7b",
  storageBucket: "sharehub-dab7b.appspot.com",
  messagingSenderId: "753341972235",
  appId: "1:753341972235:web:b479e6d5d75481db982c0e",
  measurementId: "G-XY7SXZV6FB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);