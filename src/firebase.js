// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBtRpDTL_hupVPnP9T1NeFI0sVGqG63Qa0",
  authDomain: "shop-ac075.firebaseapp.com",
  projectId: "shop-ac075",
  storageBucket: "shop-ac075.firebasestorage.app",
  messagingSenderId: "660409085845",
  appId: "1:660409085845:web:2c0c72d6dfeca00298d09c",
  measurementId: "G-F186EDXP5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Auth and export it
export const auth = getAuth(app);
export { app };
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
