// src/pages/employees/Employees.jsx
import { useEffect, useState } from "react";
import api from "../../api/client";
import { Button, Table, Modal, Form } from "react-bootstrap";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentEmployee, setCurrentEmployee] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
    branchId: "",
  });

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const { data } = await api.get("/employees");
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch branches for dropdown
  const fetchBranches = async () => {
    try {
      const { data } = await api.get("/branches");
      setBranches(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchBranches();
  }, []);

  const handleShowAdd = () => {
    setModalType("add");
    setCurrentEmployee({ name: "", email: "", role: "EMPLOYEE", branchId: "" });
    setShowModal(true);
  };

  const handleShowEdit = (employee) => {
    setModalType("edit");
    setCurrentEmployee({
      ...employee,
      branchId: employee.branch?._id || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (modalType === "add") {
        await api.post("/employees", currentEmployee);
      } else {
        await api.put(`/employees/${currentEmployee._id}`, currentEmployee);
      }
      setShowModal(false);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Employees</h3>
      <Button onClick={handleShowAdd}>+ Add Employee</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>{emp.branch?.name}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowEdit(emp)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(emp._id)}
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
          <Modal.Title>
            {modalType === "add" ? "Add Employee" : "Edit Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentEmployee.name}
                onChange={(e) =>
                  setCurrentEmployee({ ...currentEmployee, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentEmployee.email}
                onChange={(e) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={currentEmployee.role}
                onChange={(e) =>
                  setCurrentEmployee({ ...currentEmployee, role: e.target.value })
                }
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Branch</Form.Label>
              <Form.Select
                value={currentEmployee.branchId}
                onChange={(e) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    branchId: e.target.value,
                  })
                }
              >
                <option value="">-- Select Branch --</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
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

export default Employees;
