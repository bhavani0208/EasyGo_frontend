import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RoleGuard({ allow, children }) {
  const { user } = useAuth();
  if (user === undefined || user === null) {
    return <div>Loading...</div>;
  }
  if (!allow.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
