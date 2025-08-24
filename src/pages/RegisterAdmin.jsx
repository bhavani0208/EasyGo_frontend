
import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import {registerAdminApi} from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterAdmin() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [companyId, setCompanyId] = useState(""); // you already create company in backend; pick its id
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await registerAdminApi({ email, password, companyId });
      nav("/login", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-lg rounded-4 bg-light bg-opacity-75">
              <h2 className="text-center mb-4 fw-bold text-primary">
                Admin Registration
              </h2>
              <p className="text-center text-muted mb-4">
                📍 Optimize your company’s commute with EasyGo
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="companyName">
                  <Form.Label className="fw-semibold">
                    🏢 Company Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-semibold">📧 Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="fw-semibold">🔒 Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    🚀 Register
                  </Button>
                  <Button variant="outline-secondary" size="lg" href="/login">
                    🔙 Back to Login
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
