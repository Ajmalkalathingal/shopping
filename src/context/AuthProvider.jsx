import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
        const token = await currentUser.getIdTokenResult(); 
        setIsAdmin(!!token.claims.admin);
        setUser(currentUser);
        setLoading(false)
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
          <Spinner className="h-10 w-10 text-primary animate-spin" /> 
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
