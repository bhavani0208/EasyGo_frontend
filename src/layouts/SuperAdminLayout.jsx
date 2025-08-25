// src/layouts/SuperAdminLayout.jsx
import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function SuperAdminLayout({ children, onMenuChange }) {
  const [active, setActive] = useState("companies");

  const handleSelect = (menu) => {
    setActive(menu);
    onMenuChange(menu);
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white vh-100 p-3">
          <h4>SuperAdmin</h4>
          <Nav className="flex-column">
            <Nav.Link
              className={active === "companies" ? "active text-warning" : "text-white"}
              onClick={() => handleSelect("companies")}
            >
              Companies
            </Nav.Link>
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
