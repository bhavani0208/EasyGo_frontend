import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleGuard from "./components/common/RoleGuard";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import RegisterAdmin from "./pages/auth/RegisterAdmin";
import AcceptInvite from "./pages/AcceptInvite";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";
import SuperadminDashboard from "./pages/dashboards/SuperAdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />

        {/* Protected routes */}
        <Route
          path="/superadmin-dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allow={["SUPERADMIN"]}>
                <SuperadminDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allow={["ADMIN"]}>
                <AdminDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allow={["EMPLOYEE"]}>
                <EmployeeDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}
