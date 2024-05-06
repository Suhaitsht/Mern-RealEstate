// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e9a3f.firebaseapp.com",
  projectId: "mern-estate-e9a3f",
  storageBucket: "mern-estate-e9a3f.appspot.com",
  messagingSenderId: "56548722378",
  appId: "1:56548722378:web:249f53f80cd7953a74d633",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
