import { createContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signOut, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence 
} from "firebase/auth";
import { auth } from "../firebase";
import { Spinner } from "@/components/ui/spinner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // get role from token claims
        const token = await currentUser.getIdTokenResult();
        const isAdminUser = !!token.claims.admin;

  
        setIsAdmin(isAdminUser);
        setUser(currentUser);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin, logout }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
         
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};


