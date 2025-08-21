import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { getBranch, updateBranch } from "../../api/branches";

export default function BranchEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBranch(id);
        setName(data.name || "");
        setAddress(data.address || "");
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBranch(id, { name, address });
      nav("/branches");
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to update");
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-3">
        <h4 className="mb-3">Edit Branch</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && (
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
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit">Save</Button>
            </div>
          </Form>
        )}
      </Card>
    </Container>
  );
}
