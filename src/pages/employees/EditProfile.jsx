import { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/client";

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    workMode: "Office",
    officeStartTime: "",
    officeEndTime: "",
  });
  const [originalForm, setOriginalForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch employee details on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setForm(res.data);
        setOriginalForm(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  // Handle changes only if editing
  const handleChange = (e) => {
    if (!isEditing) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employees/${id}`, form);
      alert("Profile updated successfully!");
      setOriginalForm(form);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  // Cancel editing with confirmation
  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to discard changes and revert?"
    );
    if (confirmCancel) {
      setForm(originalForm);
      setIsEditing(false);
    }
  };

  return (
    <Container className="p-5">
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <h3 className="mb-4">Edit Profile</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Work Mode</Form.Label>
            {isEditing ? (
              <Form.Select
                name="workMode"
                value={form.workMode}
                onChange={handleChange}
              >
                <option>Office</option>
                <option>Hybrid</option>
                <option>Home</option>
              </Form.Select>
            ) : (
              <Form.Control
                value={form.workMode}
                readOnly
                plaintext
                tabIndex={-1}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Office Start Time</Form.Label>
            <Form.Control
              type="time"
              name="officeStartTime"
              value={form.officeStartTime}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Office End Time</Form.Label>
            <Form.Control
              type="time"
              name="officeEndTime"
              value={form.officeEndTime}
              onChange={handleChange}
              readOnly={!isEditing}
              plaintext={!isEditing}
            />
          </Form.Group>

          <Button
            variant="secondary"
            className="me-3"
            onClick={() => navigate("/employee-dashboard")}
          >
            Back to Dashboard
          </Button>

          {!isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="d-flex gap-3">
              <Button type="submit" variant="success">
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
}
