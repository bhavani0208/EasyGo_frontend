import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import api from "../api/client";

export default function AcceptInvite() {
  const [sp] = useSearchParams();
  const token = sp.get("token");
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    if (!token) setErr("Invalid invite link");
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");
    try {
      await api.post(`/employees/register/${token}`, { name, password, address });
      setOk("Registration complete! You can login now.");
      setTimeout(() => nav("/login", { replace: true }), 1000);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to register");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row><Col>
        <Card className="p-4 shadow rounded-4" style={{ width: 480 }}>
          <h3 className="text-center mb-3">Complete Your Registration</h3>
          {err && <div className="alert alert-danger">{err}</div>}
          {ok && <div className="alert alert-success">{ok}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control value={name} onChange={e=>setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Home Address</Form.Label>
              <Form.Control value={address} onChange={e=>setAddress(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="primary">Register</Button>
            </div>
          </Form>
        </Card>
      </Col></Row>
    </Container>
  );
}
