// services/authService.js
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Login user
export const loginUser = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  // Force refresh token to get latest custom claims
  const tokenResult = await user.getIdTokenResult(true);

  // Return user and admin status
  return {
    user,
    isAdmin: !!tokenResult.claims.admin
  };
};

// Signup user
export const signupUser = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // Force refresh token to get latest custom claims (if any)
  const tokenResult = await user.getIdTokenResult(true);

  return {
    user,
    isAdmin: !!tokenResult.claims.admin
  };
};

// Logout user
export const logoutUser = async () => {
  return signOut(auth);
};
