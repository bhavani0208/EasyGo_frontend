import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { acceptInvitation } from "../api/invitations";

export default function AcceptInvite() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [homeLocation, setHomeLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const t = params.get("token");
    if (t) {
      // prevent re-visiting after success by storing a marker
      const used = sessionStorage.getItem(`invite_used_${t}`);
      if (used) {
        nav("/login", { replace: true });
        return;
      }
      setToken(t);
    }
  }, [params, nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await acceptInvitation({ token, name, password, homeLocation });
      setSuccess(true);
      sessionStorage.setItem(`invite_used_${token}`, "1");
      setTimeout(() => nav("/login", { replace: true }), 1200);
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to accept invitation"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow rounded-4">
            <h3 className="text-center mb-3">Complete Your Registration</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Registration complete! Redirecting…
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Invitation Token</Form.Label>
                <Form.Control type="text" value={token} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Home Address (optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={homeLocation}
                  onChange={(e) => setHomeLocation(e.target.value)}
                  placeholder="123 Main St, City"
                />
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" disabled={submitting || !token}>
                  {submitting ? "Submitting…" : "Accept Invitation"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
