import { Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role?.toUpperCase();

  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user?._id) {
      navigate(`/employee/profile/${user._id}`);
    }
  };
  return (
    <div>
      <Nav className="flex-column p-3 bg-dark text-white vh-100">
        <Nav.Link href="/dashboard">🏠 Dashboard</Nav.Link>

        {role === "SUPERADMIN" && (
          <>
            <Nav.Link href="/companies">🏢 Companies</Nav.Link>
            <Nav.Link href="/branches">🌿 Branches</Nav.Link>
            <Nav.Link href="/employees">👥 Employees</Nav.Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Nav.Link href="/branches">🌿 Branches</Nav.Link>
            <Nav.Link href="/employees">👥 Employees</Nav.Link>
          </>
        )}

        {role === "EMPLOYEE" && (
          <Nav.Link onClick={handleProfileClick}>🙍 Profile</Nav.Link>
        )}
      </Nav>
    </div>
  );
}
