import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuth.js";

export default function ProtectedRoute() {
  const { token } = useAuthContext();
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}
