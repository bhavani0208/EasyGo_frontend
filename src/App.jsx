import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider";
// import TopNav from "./components/nav/TopNav";
import Landing from "./pages/Landing";
import RegisterAdmin from "./pages/RegisterAdmin";
import Login from "./pages/Login";
import AcceptInvite from "./pages/AcceptInvite";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";
import BranchList from "./pages/branches/BranchList";
import BranchCreate from "./pages/branches/BranchCreate";
import BranchEdit from "./pages/branches/BranchEdit";

// import Login from "./pages/Login";
// import AcceptInvite from "./pages/AcceptInvite";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import RoleGuard from "./components/common/RoleGuard";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/branches" element={<BranchList />} />
        <Route path="/branches/create" element={<BranchCreate />} />
        <Route path="/branches/:id/edit" element={<BranchEdit />} />
      </Routes>
    </div>

    // <AuthProvider>
    //   <TopNav />
    //   <Routes>
    //     <Route path="/" element={<Landing />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register-admin" element={<RegisterAdmin />} />
    //     <Route path="/accept-invite" element={<AcceptInvite />} />

    //     {/* Authenticated area */}
    //     <Route element={<ProtectedRoute />}>
    //       <Route path="/dashboard" element={<DashboardRedirect />} />

    //       <Route element={<RoleGuard allow={["SUPERADMIN"]} />}>
    //         <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
    //       </Route>

    //       <Route element={<RoleGuard allow={["ADMIN"]} />}>
    //         <Route path="/admin/*" element={<AdminDashboard />} />
    //       </Route>

    //       <Route element={<RoleGuard allow={["EMPLOYEE"]} />}>
    //         <Route path="/employee/*" element={<EmployeeDashboard />} />
    //       </Route>
    //     </Route>

    //     <Route path="*" element={<Navigate to="/" replace />} />
    //   </Routes>
    //</AuthProvider>
  );
}

// import { useEffect } from "react";
// import { useAuthContext } from "./hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// function DashboardRedirect() {
//   const { user } = useAuthContext();
//   const nav = useNavigate();

//   useEffect(() => {
//     if (!user) return;
//     if (user.role === "SUPERADMIN") nav("/superadmin", { replace: true });
//     else if (user.role === "ADMIN") nav("/admin", { replace: true });
//     else if (user.role === "EMPLOYEE") nav("/employee", { replace: true });
//   }, [user, nav]);

//   return null;
// }
