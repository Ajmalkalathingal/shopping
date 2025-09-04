import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function AdminRoute({ children }) {
  const { user, isAdmin,loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/user-auth" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
