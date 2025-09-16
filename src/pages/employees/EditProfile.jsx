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

  // ✅ Fetch employee details
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employees/${id}`, form);
      alert("Profile updated successfully!");
      navigate("/employee-dashboard");
    } catch (err) {
      alert("Failed to update profile", err);
    }
  };

  // ✅ Cancel with confirmation
  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to discard changes and return to Dashboard?"
    );
    if (confirmCancel) {
      navigate("/employee-dashboard");
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
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Work Mode</Form.Label>
            <Form.Select
              name="workMode"
              value={form.workMode}
              onChange={handleChange}
            >
              <option>Office</option>
              <option>Hybrid</option>
              <option>Home</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Office Start Time</Form.Label>
            <Form.Control
              type="time"
              name="officeStartTime"
              value={form.officeStartTime}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Office End Time</Form.Label>
            <Form.Control
              type="time"
              name="officeEndTime"
              value={form.officeEndTime}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex gap-3">
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
