// src/pages/companies/Companies.jsx
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { fetchCompanies, createCompany, updateCompany, deleteCompany } from "../../api/companies";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [form, setForm] = useState({ name: "", address: "" });

  // Load companies on mount
  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (err) {
      console.error("Error loading companies:", err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingCompany) {
        await updateCompany(editingCompany._id, form);
      } else {
        await createCompany(form);
      }
      setShowModal(false);
      setEditingCompany(null);
      setForm({ name: "", address: "" });
      loadCompanies();
    } catch (err) {
      console.error("Error saving company:", err);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setForm({ name: company.name, address: company.address });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      await deleteCompany(id);
      loadCompanies();
    }
  };

  return (
    <div>
      <h3>Companies</h3>
      <Button variant="success" onClick={() => setShowModal(true)}>
        + Add Company
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.address}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(c)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(c._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCompany ? "Edit Company" : "Add Company"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
