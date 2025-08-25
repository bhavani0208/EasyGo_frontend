import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

export default function EmployeeLayout({ children, onMenuChange }) {
  const [active, setActive] = useState("profile");

  const handleSelect = (menu) => {
    setActive(menu);
    onMenuChange(menu);
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-success text-white vh-100 p-3">
          <h4>Employee</h4>
          <Nav className="flex-column">
            <Nav.Link
              className={active === "profile" ? "active text-warning" : "text-white"}
              onClick={() => handleSelect("profile")}
            >
              My Profile
            </Nav.Link>
            <Nav.Link
              className={active === "tasks" ? "active text-warning" : "text-white"}
              onClick={() => handleSelect("tasks")}
            >
              My Tasks
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
