// src/pages/branches/Branches.jsx
import { useEffect, useState } from "react";
import api from "./../../api/client";
import { Button, Table, Modal, Form } from "react-bootstrap";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentBranch, setCurrentBranch] = useState({ name: "", companyId: "" });

  // Fetch branches
  const fetchBranches = async () => {
    try {
      const { data } = await api.get("/branches");
      setBranches(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch companies for dropdown
  const fetchCompanies = async () => {
    try {
      const { data } = await api.get("/companies");
      setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchCompanies();
  }, []);

  const handleShowAdd = () => {
    setModalType("add");
    setCurrentBranch({ name: "", companyId: "" });
    setShowModal(true);
  };

  const handleShowEdit = (branch) => {
    setModalType("edit");
    setCurrentBranch({ ...branch, companyId: branch.company?._id || "" });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/branches/${id}`);
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (modalType === "add") {
        await api.post("/branches", currentBranch);
      } else {
        await api.put(`/branches/${currentBranch._id}`, currentBranch);
      }
      setShowModal(false);
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Branches</h3>
      <Button onClick={handleShowAdd}>+ Add Branch</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch._id}>
              <td>{branch.name}</td>
              <td>{branch.company?.name}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowEdit(branch)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(branch._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add Branch" : "Edit Branch"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Branch Name</Form.Label>
              <Form.Control
                type="text"
                value={currentBranch.name}
                onChange={(e) =>
                  setCurrentBranch({ ...currentBranch, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Company</Form.Label>
              <Form.Select
                value={currentBranch.companyId}
                onChange={(e) =>
                  setCurrentBranch({ ...currentBranch, companyId: e.target.value })
                }
              >
                <option value="">-- Select Company --</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
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
};

export default Branches;
