import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { createBranch } from "../../api/branches";
import useAuthContext from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function BranchCreate() {
  //const { useAuthContext } = useAuthContext();
  const companyId =
    useAuthContext?.company ||
    useAuthContext?.companyId ||
    useAuthContext?.company?._id;
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createBranch({ name, address, company: companyId });
      nav("/branches");
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to create branch"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-3">
        <h4 className="mb-3">Create Branch</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City"
            />
          </Form.Group>
          <div className="d-grid">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : "Create"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
