import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Spinner,
  Badge,
  Nav,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";

import Companies from "../companies/Companies";
import Branches from "../branches/Branches";
import Employees from "../employees/Employees";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("companies");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logged-in superadmin from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Optionally: preload data for companies, branches, employees
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "companies":
        return <Companies />;
      case "branches":
        return <Branches />;
      case "employees":
        return <Employees />;
      default:
        return <Companies />;
    }
  };

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="p-3 text-white d-flex flex-column justify-content-between"
        style={{
          width: "260px",
          background: "linear-gradient(135deg, #283e51, #485563)",
        }}
      >
        <div>
          {/* Logo */}
          <h4 className="mb-4 text-center">⚡ SuperAdmin</h4>

          {/* Profile Section */}
          <div className="text-center mb-4">
            <Image
              src={`https://ui-avatars.com/api/?name=${
                user?.name || "SuperAdmin"
              }&background=485563&color=fff&rounded=true`}
              roundedCircle
              width={70}
              height={70}
              className="mb-2 border border-light"
              alt="SuperAdmin Avatar"
            />
            <h6 className="mb-0">{user?.name}</h6>
            <small className="text-light">{user?.email}</small>
            <div>
              <Badge bg="warning" text="dark" className="mt-1">
                SUPERADMIN
              </Badge>
            </div>
          </div>

          {/* Navigation */}
          <Nav className="flex-column gap-2">
            <Nav.Link
              onClick={() => setActiveTab("companies")}
              className={`text-white ${
                activeTab === "companies" ? "fw-bold" : ""
              }`}
            >
              🏢 Companies
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveTab("branches")}
              className={`text-white ${
                activeTab === "branches" ? "fw-bold" : ""
              }`}
            >
              🏬 Branches
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveTab("employees")}
              className={`text-white ${
                activeTab === "employees" ? "fw-bold" : ""
              }`}
            >
              👥 Employees
            </Nav.Link>
          </Nav>
        </div>

        {/* Logout */}
        <Button variant="outline-light" className="mt-4" onClick={handleLogout}>
          🚪 Logout
        </Button>
      </div>

      {/* Main Content */}
      <Container fluid className="p-4 bg-light">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Welcome, {user?.name} 👋</h2>
            <p className="fw-semibold text-primary mb-0">
              🌐 Superadmin Control Panel
            </p>
          </Col>
        </Row>

        {/* Dynamic Section */}
        <Row>
          <Col>{renderContent()}</Col>
        </Row>
      </Container>
    </div>
  );
}
