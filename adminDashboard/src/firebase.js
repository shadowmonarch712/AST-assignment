// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKBWcBs24qTjg9FR1kwjaIkil3hm6f45E",
  authDomain: "admindashboard-46466.firebaseapp.com",
  projectId: "admindashboard-46466",
  storageBucket: "admindashboard-46466.appspot.com",
  messagingSenderId: "752737812888",
  appId: "1:752737812888:web:2c1e61249ca24aed642bed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;