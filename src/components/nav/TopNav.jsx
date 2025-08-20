import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function TopNav() {
  const { user, logout } = useAuth();
  return (
    <Navbar bg="light" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          EasyGo
        </Navbar.Brand>
        <Nav className="ms-auto">
          {!user ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register-admin">
                Register
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
