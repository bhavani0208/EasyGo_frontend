import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuth.js";

export default function RoleGuard({ allow = [] }) {
  const { user } = useAuthContext();
  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
