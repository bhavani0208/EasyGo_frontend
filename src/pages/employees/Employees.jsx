// import { useEffect, useState } from "react";
// import {
//   fetchEmployeesByBranch,
//   deleteEmployee,
//   updateEmployee,
//   fetchMyEmployee,
//   fetchEmployeesByCompany,
// } from "../../api/employees";
// import { Button, Table, Modal, Form } from "react-bootstrap";

// const Employees = ({ companyId, branches }) => {
//   const [employees, setEmployees] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("add");
//   const [selectedBranch, setSelectedBranch] = useState("");

//   const [currentEmployee, setCurrentEmployee] = useState({
//     name: "",
//     email: "",
//     role: "EMPLOYEE",
//     branchId: "",
//   });

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         let data;
//         if (selectedBranch) {
//           data = await fetchEmployeesByBranch(selectedBranch);
//         } else if (companyId) {
//           data = await fetchEmployeesByCompany(companyId);
//         }
//         setEmployees(data || []);
//       } catch (err) {
//         setEmployees([]);
//       }
//     };
//     fetchEmployees();
//   }, [companyId, selectedBranch]);

//   const handleShowAdd = () => {
//     setModalType("add");
//     setCurrentEmployee({
//       name: "",
//       email: "",
//       role: "EMPLOYEE",
//       branchId: "",
//     });
//     setShowModal(true);
//   };

//   const handleShowEdit = (employee) => {
//     setModalType("edit");
//     setCurrentEmployee({
//       ...employee,
//       branchId: employee.branch?._id || "",
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     await deleteEmployee(id);
//     // Refresh after delete
//     if (selectedBranch) {
//       setEmployees(await fetchEmployeesByBranch(selectedBranch));
//     } else if (companyId) {
//       setEmployees(await fetchEmployeesByCompany(companyId));
//     }
//   };

//   const handleSave = async () => {
//     if (modalType === "add") {
//       // If you want to allow admin to add directly, implement here
//       // await addEmployee(currentEmployee);
//     } else {
//       await updateEmployee(currentEmployee._id, currentEmployee);
//     }
//     setShowModal(false);
//     if (selectedBranch) {
//       setEmployees(await fetchEmployeesByBranch(selectedBranch));
//     } else if (companyId) {
//       setEmployees(await fetchEmployeesByCompany(companyId));
//     }
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4>👥 Employees</h4>
//         <Button onClick={handleShowAdd}>+ Add Employee</Button>
//       </div>
//       <Form.Group className="mb-3" controlId="branchFilter">
//         <Form.Label>Filter by Branch</Form.Label>
//         <Form.Select
//           value={selectedBranch}
//           onChange={(e) => setSelectedBranch(e.target.value)}
//         >
//           <option value="">-- All Branches --</option>
//           {branches.map((branch) => (
//             <option key={branch._id} value={branch._id}>
//               {branch.name}
//             </option>
//           ))}
//         </Form.Select>
//       </Form.Group>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Branch</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id}>
//               <td>{emp.name}</td>
//               <td>{emp.email}</td>
//               <td>{emp.role}</td>
//               <td>{emp.branch?.name}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   onClick={() => handleShowEdit(emp)}
//                 >
//                   Edit
//                 </Button>{" "}
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete(emp._id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalType === "add" ? "Add Employee" : "Edit Employee"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentEmployee.name}
//                 onChange={(e) =>
//                   setCurrentEmployee({
//                     ...currentEmployee,
//                     name: e.target.value,
//                   })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={currentEmployee.email}
//                 onChange={(e) =>
//                   setCurrentEmployee({
//                     ...currentEmployee,
//                     email: e.target.value,
//                   })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Role</Form.Label>
//               <Form.Select
//                 value={currentEmployee.role}
//                 onChange={(e) =>
//                   setCurrentEmployee({
//                     ...currentEmployee,
//                     role: e.target.value,
//                   })
//                 }
//               >
//                 <option value="EMPLOYEE">Employee</option>
//                 <option value="ADMIN">Admin</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Branch</Form.Label>
//               <Form.Select
//                 value={currentEmployee.branchId}
//                 onChange={(e) =>
//                   setCurrentEmployee({
//                     ...currentEmployee,
//                     branchId: e.target.value,
//                   })
//                 }
//               >
//                 <option value="">-- Select Branch --</option>
//                 {branches.map((b) => (
//                   <option key={b._id} value={b._id}>
//                     {b.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Employees;
import { useEffect, useState } from "react";
import {
  fetchEmployeesByBranch,
  deleteEmployee,
  updateEmployee,
  fetchEmployeesByCompany,
  inviteEmployee,
} from "../../api/employees";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";

const Employees = ({ companyId, branches }) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [inviteModal, setInviteModal] = useState(false);

  const [inviteForm, setInviteForm] = useState({
    email: "",
    branchId: "",
    workType: "",
  });
  const [inviteSuccess, setInviteSuccess] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  const [currentEmployee, setCurrentEmployee] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
    branchId: "",
  });

  // Fetch employees by selected branch/company
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let data;
        if (selectedBranch) {
          data = await fetchEmployeesByBranch(selectedBranch);
        } else if (companyId) {
          data = await fetchEmployeesByCompany(companyId);
        }
        console.log("employees from api", data);
        setEmployees(data || []);
      } catch (err) {
        setEmployees([]);
      }
    };
    fetchEmployees();
  }, [companyId, selectedBranch, inviteSuccess]); // refresh list after invite

  const handleShowAdd = () => {
    setModalType("add");
    setCurrentEmployee({
      name: "",
      email: "",
      role: "EMPLOYEE",
      branchId: "",
    });
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
    await deleteEmployee(id);
    // Refresh after delete
    if (selectedBranch) {
      setEmployees(await fetchEmployeesByBranch(selectedBranch));
    } else if (companyId) {
      setEmployees(await fetchEmployeesByCompany(companyId));
    }
  };

  const handleSave = async () => {
    if (modalType === "edit") {
      await updateEmployee(currentEmployee._id, currentEmployee);
    }
    setShowModal(false);
    if (selectedBranch) {
      setEmployees(await fetchEmployeesByBranch(selectedBranch));
    } else if (companyId) {
      setEmployees(await fetchEmployeesByCompany(companyId));
    }
  };

  // Invite Employee Handler
  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteError("");
    setInviteSuccess("");
    try {
      await inviteEmployee(inviteForm);
      setInviteSuccess("Invite sent successfully!");
      setInviteModal(false);
      setInviteForm({ email: "", branchId: "", workType: "" });
    } catch (err) {
      setInviteError(err.response?.data?.message || "Failed to send invite");
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Employees</h5>
        <Button variant="primary" onClick={() => setInviteModal(true)}>
          + Invite Employee
        </Button>
      </div>

      <Form.Group className="mb-3" controlId="branchFilter">
        <Form.Label>Filter by Branch</Form.Label>
        <Form.Select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">-- All Branches --</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Table striped bordered hover responsive>
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
          {employees.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No employees registered
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>{emp.branch?.name || ""}</td>
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
            ))
          )}
        </tbody>
      </Table>

      {/* Edit/Add Modal */}
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
                  setCurrentEmployee({
                    ...currentEmployee,
                    name: e.target.value,
                  })
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
                  setCurrentEmployee({
                    ...currentEmployee,
                    role: e.target.value,
                  })
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

      {/* Invite Modal */}
      <Modal show={inviteModal} onHide={() => setInviteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Invite Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInvite}>
            <Form.Group className="mb-3" controlId="inviteEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter employee email"
                value={inviteForm.email}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inviteBranch">
              <Form.Label>Branch</Form.Label>
              <Form.Select
                value={inviteForm.branchId}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, branchId: e.target.value })
                }
                required
              >
                <option value="">-- Select Branch --</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="inviteWorkType">
              <Form.Label>Work Type</Form.Label>
              <Form.Select
                value={inviteForm.workType}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, workType: e.target.value })
                }
                required
              >
                <option value="">-- Select Work Type --</option>
                <option value="HYBRID">Hybrid</option>
                <option value="OFFICE">Office</option>
                <option value="REMOTE">Remote</option>
              </Form.Select>
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="success" disabled={inviteLoading}>
                {inviteLoading ? "Sending..." : "Send Invite"}
              </Button>
            </div>
            {inviteError && (
              <Alert variant="danger" className="mt-2">
                {inviteError}
              </Alert>
            )}
            {inviteSuccess && (
              <Alert variant="success" className="mt-2">
                {inviteSuccess}
              </Alert>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Employees;
