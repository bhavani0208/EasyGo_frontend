import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { fetchBranchesByCompany } from "../../api/branches";
import { createInvitation } from "../../api/invitations";

export default function InviteEmployeeForm({ companyId }) {
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      try {
        const data = await fetchBranchesByCompany(companyId);
        setBranches(data);
      } catch {
        // ignore
      }
    })();
  }, [companyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await createInvitation({
        email,
        role: "EMPLOYEE",
        company: companyId,
        branch,
      });
      setSuccess(true);
      setEmail("");
      setBranch("");
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to send invite"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Invitation sent!</Alert>}
      <Row className="g-3">
        <Col xs={12}>
          <Form.Label>Employee Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Col>
        <Col xs={12}>
          <Form.Label>Branch</Form.Label>
          <Form.Select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <option value="">Select branch</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} className="d-grid">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send Invite"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
