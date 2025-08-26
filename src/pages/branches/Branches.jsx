import { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import {
  createBranchApi,
  fetchBranchesApi,
  fetchBranchesByCompanyApi,
  updateBranchApi,
  deleteBranchApi,
} from "../../api/branches";

const Branches = () => {
  const { user } = useAuth();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [branchForm, setBranchForm] = useState({ name: "", address: "" });

  // ✅ Fetch branches based on role
  const loadBranches = async () => {
    setLoading(true);
    try {
      let data = [];

      if (user.role === "ADMIN") {
        // 🔹 Admin sees only their company branches
        const companyId = user.companyId || user.company?._id;
        if (companyId) {
          data = await fetchBranchesByCompanyApi(user.companyId);
        } else {
          console.error("❌ No companyId found for ADMIN user");
          data = [];
        }
      } else if (user.role === "SUPERADMIN") {
        // 🔹 Superadmin sees all branches
        data = await fetchBranchesApi();
      }
      setBranches(data);
    } catch (error) {
      console.error("❌ Error fetching branches:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBranches();
  }, [user]);

  // ✅ Handle form input
  const handleChange = (e) => {
    setBranchForm({ ...branchForm, [e.target.name]: e.target.value });
  };

  // ✅ Handle create/update
  const handleSave = async () => {
    try {
      if (editingBranch) {
        await updateBranchApi(editingBranch._id, branchForm);
      } else {
        await createBranchApi({ ...branchForm, companyId: user.companyId });
      }
      loadBranches();
      setShowModal(false);
      setEditingBranch(null);
      setBranchForm({ name: "", address: "" });
    } catch (error) {
      console.error("❌ Error saving branch:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteBranchApi(id);
      loadBranches();
    } catch (error) {
      console.error("❌ Error deleting branch:", error);
    }
  };

  return (
    <div className="p-3">
      <h3>Branches</h3>

      <Button className="mb-3" onClick={() => setShowModal(true)}>
        + Add Branch
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch._id}>
                <td>{branch.name}</td>
                <td>{branch.address}</td>
                <td>{branch.company?.name || "—"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      setEditingBranch(branch);
                      setBranchForm({
                        name: branch.name,
                        address: branch.address,
                      });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(branch._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBranch ? "Edit Branch" : "Add Branch"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={branchForm.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={branchForm.address}
                onChange={handleChange}
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
};

export default Branches;
