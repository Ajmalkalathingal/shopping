// services/authService.js
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


// Login user
export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Signup user
export const signupUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};


// Logout user
export const logoutUser = async () => {
  return signOut(auth);
};
