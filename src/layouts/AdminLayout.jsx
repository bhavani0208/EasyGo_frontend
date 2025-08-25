import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

export default function AdminLayout({ children, onMenuChange }) {
  const [active, setActive] = useState("branches");

  const handleSelect = (menu) => {
    setActive(menu);
    onMenuChange(menu);
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-primary text-white vh-100 p-3">
          <h4>Admin</h4>
          <Nav className="flex-column">
            <Nav.Link
              className={active === "branches" ? "active text-warning" : "text-white"}
              onClick={() => handleSelect("branches")}
            >
              Branches
            </Nav.Link>
            <Nav.Link
              className={active === "employees" ? "active text-warning" : "text-white"}
              onClick={() => handleSelect("employees")}
            >
              Employees
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
