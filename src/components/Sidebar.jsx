import { Nav,Button } from "react-bootstrap";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role?.toUpperCase();

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
        <Nav.Link href="/profile">🙍 Profile</Nav.Link>
      )}
    </Nav>

      
    </div>
    
  );
}
