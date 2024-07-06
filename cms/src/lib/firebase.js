// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "greenscape-4f084.firebaseapp.com",
  projectId: "greenscape-4f084",
  storageBucket: "greenscape-4f084.appspot.com",
  messagingSenderId: "387063672164",
  appId: "1:387063672164:web:34a579deefe29d79569e71",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
