// // import { useEffect, useState } from "react";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Card,
// //   Table,
// //   Button,
// //   Modal,
// //   Form,
// //   Alert,
// //   Spinner,
// //   Badge,
// //   Nav,
// //   Image,
// // } from "react-bootstrap";
// // import api from "../../api/client";
// // import useAuth from "../../hooks/useAuth";
// // import Branches from "../branches/Branches";
// // import employees from "../employees/Employees";
// // import { inviteEmployee } from "../../api/employees";

// // export default function AdminDashboard() {
// //   const { user } = useAuth();
// //   const [branches, setBranches] = useState([]);
// //   const [employees, setEmployees] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Sidebar navigation section state
// //   const [activeSection, setActiveSection] = useState("branches");

// //   // Invite Modal State
// //   const [showInviteModal, setShowInviteModal] = useState(false);
// //   const [inviteForm, setInviteForm] = useState({
// //     email: "",
// //     branchId: "",
// //     workType: "",
// //   });
// //   const [inviteLoading, setInviteLoading] = useState(false);
// //   const [inviteError, setInviteError] = useState("");
// //   const [inviteSuccess, setInviteSuccess] = useState("");

// //   // Fetch branches filtered for this admin's company
// //   const fetchBranchesForCompany = async () => {
// //     try {
// //       if (user?.companyId) {
// //         const res = await api.get(`/branches/company/${user.companyId}`);
// //         setBranches(res.data || []);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching branches", err);
// //       setBranches([]);
// //     }
// //   };

// //   // Fetch employees filtered for this admin's company
// //   const fetchEmployeesForCompany = async () => {
    
// //     try {
// //       if (user?.companyId) {
// //         const res = await api.get(`/employees/company/${user.companyId}`);
// //         setEmployees(res.data || []);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching employees", err);
// //       setEmployees([]);
// //     }
// //   };
// //    // Fetch employees filtered by branch
// //   const fetchEmployeesByBranch = async (branchId) => {
// //     setLoadingEmployees(true);
// //     try {
// //       if (branchId) {
// //         const res = await api.get(`/employees/branch/${branchId}`);
// //         setEmployees(res.data || []);
// //       } else {
// //         // If no branch selected, fallback to all employees
// //         fetchEmployeesForCompany();
// //       }
// //     } catch (err) {
// //       console.error("Error fetching employees for branch", err);
// //       setEmployees([]);
// //     } finally {
// //       setLoadingEmployees(false);
// //     }
// //   };


// //   useEffect(() => {
    
// //     setLoading(true);
// //     Promise.all([
// //       fetchBranchesForCompany(),
// //       fetchEmployeesForCompany(),
// //     ]).finally(() => setLoading(false));
// //   }, [user]);

// //    //Fetch employees on branch selection change
// //   // useEffect(() => {
// //   //   if (selectedEmployeeBranch) {
// //   //     fetchEmployeesByBranch(selectedEmployeeBranch);
// //   //   } else {
// //   //     fetchEmployeesForCompany();
// //   //   }
// //   // }, [selectedEmployeeBranch]);

// //   // Refresh branches whenever modal opens
// //   const handleShowInviteModal = async () => {
// //     await fetchBranchesForCompany();
// //     setShowInviteModal(true);
// //     setInviteError("");
// //     setInviteSuccess("");
// //     setInviteForm({ email: "", branchId: "", workType: "" });
// //   };

// //   // Invite handler
// //   const handleInvite = async (e) => {
// //     e.preventDefault();
// //     setInviteLoading(true);
// //     setInviteError("");
// //     setInviteSuccess("");
// //     try {
// //       await inviteEmployee(inviteForm);
// //       setInviteSuccess("Invite sent successfully!");
// //       setShowInviteModal(false);
// //       setInviteForm({ email: "", branchId: "", workType: "" });
// //        if (selectedEmployeeBranch) {
// //         fetchEmployeesByBranch(selectedEmployeeBranch);
// //       } else {
// //         fetchEmployeesForCompany();
// //       }
// //       //fetchEmployeesForCompany();
// //     } catch (err) {
// //       setInviteError(err.response?.data?.message || "Failed to send invite");
// //     } finally {
// //       setInviteLoading(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     window.location.href = "/login";
// //   };

// //   if (loading) {
// //     return (
// //       <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
// //         <Spinner animation="border" variant="primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="d-flex" style={{ minHeight: "100vh" }}>
// //       {/* Sidebar */}
// //       <div
// //         className="p-3 text-white d-flex flex-column justify-content-between"
// //         style={{
// //           width: "260px",
// //           background: "linear-gradient(135deg, #0f2027, #2c5364)",
// //         }}
// //       >
// //         <div>
// //           <h4 className="mb-4 text-center">⚙️ EasyGo</h4>
// //           <div className="text-center mb-4">
// //             <Image
// //               src={`https://ui-avatars.com/api/?name=${
// //                 user?.name || "Admin"
// //               }&background=2c5364&color=fff&rounded=true`}
// //               roundedCircle
// //               width={70}
// //               height={70}
// //               className="mb-2 border border-light"
// //               alt="Admin Avatar"
// //             />
// //             <h6 className="mb-0">{user?.name}</h6>
// //             <small className="text-light">{user?.email}</small>
// //             <div>
// //               <Badge bg="info" className="mt-1">
// //                 {user?.role || "Admin"}
// //               </Badge>
// //             </div>
// //           </div>
// //           <Nav className="flex-column gap-2">
// //             <Nav.Link
// //               onClick={() => setActiveSection("branches")}
// //               className={`text-white ${
// //                 activeSection === "branches" ? "fw-semibold" : ""
// //               }`}
// //             >
// //               🏢 Manage Branches
// //             </Nav.Link>
// //             <Nav.Link
// //               onClick={() => setActiveSection("employees")}
// //               className={`text-white ${
// //                 activeSection === "employees" ? "fw-semibold" : ""
// //               }`}
// //             >
// //               👥 Manage Employees
// //             </Nav.Link>
// //             {/* You can add further section navigation similarly */}
// //           </Nav>
// //         </div>
// //         <Button variant="outline-light" className="mt-4" onClick={handleLogout}>
// //           🚪 Logout
// //         </Button>
// //       </div>

// //       {/* Main Content */}
// //       <Container fluid className="p-4 bg-light">
// //         <Row className="mb-4">
// //           <Col>
// //             <h2 className="fw-bold">Welcome, {user?.name} 👋</h2>
// //             {user?.company?.name && (
// //               <p className="fw-semibold text-primary mb-0">
// //                 🏢 {user.company.name}
// //               </p>
// //             )}
// //           </Col>
// //         </Row>

// //         {activeSection === "branches" && (
// //           <Row id="branches" className="mb-4">
// //             <Col>
// //               <Card className="shadow-sm border-0">
// //                 <Card.Body>
// //                   {/* Branches component: pass branches and user props as needed */}
// //                   <Branches user={user} branches={branches} />
// //                 </Card.Body>
// //               </Card>
// //             </Col>
// //           </Row>
// //         )}

// //         {activeSection === "employees" && (
// //           <Row id="employees">
// //             <Col>
// //               <Card className="shadow-sm border-0">
// //                 <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
// //                   <h5 className="mb-0">👥 Employees</h5>
// //                   <Button
// //                     variant="light"
// //                     size="sm"
// //                     onClick={handleShowInviteModal}
// //                   >
// //                     + Invite Employee
// //                   </Button>
// //                 </Card.Header>
// //                 <Card.Body>
// //                   {inviteError && <Alert variant="danger">{inviteError}</Alert>}
// //                   {inviteSuccess && (
// //                     <Alert variant="success">{inviteSuccess}</Alert>
// //                   )}
// //                   {employees.length === 0 ? (
// //                     <p className="text-muted">No employees registered</p>
// //                   ) : (
// //                     <Table bordered hover responsive>
// //                       <thead>
// //                         <tr>
// //                           <th>Name</th>
// //                           <th>Email</th>
// //                           <th>Branch</th>
// //                           <th>Work Type</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                     {employees.length === 0 ? (
// //                       <tr>
// //                         <td colSpan={4} className="text-center">
// //                           No employees registered
// //                         </td>
// //                       </tr>
// //                     ) : (
// //                       employees.map((emp) => (
// //                         <tr key={emp._id}>
// //                           <td>{emp.name}</td>
// //                           <td>{emp.email}</td>
// //                            <td>{emp.branch?.name || "—"}</td>
// //                           <td>{emp.workType || "—"}</td>                         
// //                         </tr>
// //                       ))
// //                     )}
// //                   </tbody>
// //                     </Table>
// //                   )}
// //                 </Card.Body>
// //               </Card>
// //             </Col>
// //           </Row>
// //         )}

// //         {/* Invite Employee Modal */}
// //         <Modal
// //           show={showInviteModal}
// //           onHide={() => setShowInviteModal(false)}
// //           centered
// //         >
// //           <Modal.Header closeButton>
// //             <Modal.Title>Invite Employee</Modal.Title>
// //           </Modal.Header>
// //           <Modal.Body>
// //             <Form onSubmit={handleInvite}>
// //               <Form.Group className="mb-3" controlId="inviteEmail">
// //                 <Form.Label>Email</Form.Label>
// //                 <Form.Control
// //                   type="email"
// //                   placeholder="Enter employee email"
// //                   value={inviteForm.email}
// //                   onChange={(e) =>
// //                     setInviteForm({ ...inviteForm, email: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </Form.Group>

// //               <Form.Group className="mb-3" controlId="inviteBranch">
// //                 <Form.Label>Branch</Form.Label>
// //                 <Form.Select
// //                   value={inviteForm.branchId}
// //                   onChange={(e) =>
// //                     setInviteForm({ ...inviteForm, branchId: e.target.value })
// //                   }
// //                   required
// //                 >
// //                   <option value="">-- Select Branch --</option>
// //                   {branches.map((branch) => (
// //                     <option key={branch._id} value={branch._id}>
// //                       {branch.name}
// //                     </option>
// //                   ))}
// //                 </Form.Select>
// //               </Form.Group>
// //               <Form.Group className="mb-3" controlId="inviteWorkType">
// //                 <Form.Label>Work Type</Form.Label>
// //                 <Form.Select
// //                   value={inviteForm.workType}
// //                   onChange={(e) =>
// //                     setInviteForm({ ...inviteForm, workType: e.target.value })
// //                   }
// //                   required
// //                 >
// //                   <option value="">-- Select Work Type --</option>
// //                   <option value="HYBRID">Hybrid</option>
// //                   <option value="OFFICE">Office</option>
// //                   <option value="REMOTE">Remote</option>
// //                 </Form.Select>
// //               </Form.Group>
// //               <div className="d-grid">
// //                 <Button
// //                   type="submit"
// //                   variant="success"
// //                   disabled={inviteLoading}
// //                 >
// //                   {inviteLoading ? (
// //                     <Spinner animation="border" size="sm" />
// //                   ) : (
// //                     "Send Invite"
// //                   )}
// //                 </Button>
// //               </div>
// //             </Form>
// //           </Modal.Body>
// //         </Modal>
// //       </Container>
// //     </div>
// //     // <div></div>
// //   );
// // }













// import { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Alert,
//   Spinner,
//   Badge,
//   Nav,
//   Image,
// } from "react-bootstrap";
// import api from "../../api/client";
// import useAuth from "../../hooks/useAuth";
// import Branches from "../branches/Branches";
// import { inviteEmployee,updateEmployee,deleteEmployee } from "../../api/employees";

// export default function AdminDashboard() {
//   const { user } = useAuth();
//   const [branches, setBranches] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editModalShow, setEditModalShow] = useState(false);
// const [editEmployee, setEditEmployee] = useState(null);
// const [editLoading, setEditLoading] = useState(false);
// const [editError, setEditError] = useState("");


//   const [activeSection, setActiveSection] = useState("branches");
//   const [selectedEmployeeBranch, setSelectedEmployeeBranch] = useState("");

//   // Invite Modal State
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [inviteForm, setInviteForm] = useState({
//     email: "",
//     branchId: "",
//     workType: "",
//   });
//   const [inviteLoading, setInviteLoading] = useState(false);
//   const [inviteError, setInviteError] = useState("");
//   const [inviteSuccess, setInviteSuccess] = useState("");

//   // Fetch branches filtered for this admin's company
//   const fetchBranchesForCompany = async () => {
//     try {
//       if (user?.companyId) {
//         const res = await api.get(`/branches/company/${user.companyId}`);
//         setBranches(res.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching branches", err);
//       setBranches([]);
//     }
//   };

//   // Fetch employees filtered for this admin's company
//   const fetchEmployeesForCompany = async () => {
//     try {
//       if (user?.companyId) {
//         const res = await api.get(`/employees/company/${user.companyId}`);
//         setEmployees(res.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching employees", err);
//       setEmployees([]);
//     }
//   };

//   // Fetch employees filtered by branch
//   const fetchEmployeesByBranch = async (branchId) => {
//     try {
//       if (branchId) {
//         const res = await api.get(`/employees/branch/${branchId}`);
//         setEmployees(res.data || []);
//       } else {
//         fetchEmployeesForCompany();
//       }
//     } catch (err) {
//       console.error("Error fetching employees for branch", err);
//       setEmployees([]);
//     }
//   };
//   const handleEditEmployee = (employee) => {
//   setEditEmployee({
//     _id: employee._id,
//     name: employee.name || "",
//     email: employee.email || "",
//     branchId: employee.branch?._id || "",
//     workMode: employee.workMode || "",
//   });
//   setEditError("");
//   setEditModalShow(true);
// };
// const handleSaveEdit = async () => {
//   setEditLoading(true);
//   setEditError("");
//   try {
//     await updateEmployee(editEmployee._id, {
//       name: editEmployee.name,
//       email: editEmployee.email,
//       branchId: editEmployee.branchId,
//       workMode: editEmployee.workMode,
//     });
//     setEditModalShow(false);
//     if (selectedEmployeeBranch) {
//       fetchEmployeesByBranch(selectedEmployeeBranch);
//     } else {
//       fetchEmployeesForCompany();
//     }
//   } catch (err) {
//     setEditError(err.response?.data?.message || "Failed to update employee");
//   } finally {
//     setEditLoading(false);
//   }
// };

//   const handleDeleteEmployee = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this employee?")) return;
//   try {
//     await deleteEmployee(id);
//     if (selectedEmployeeBranch) {
//       fetchEmployeesByBranch(selectedEmployeeBranch);
//     } else {
//       fetchEmployeesForCompany();
//     }
//   } catch (error) {
//     alert("Failed to delete employee.");
//   }
// };

//   // Initial load for branches and employees
//   useEffect(() => {
//     setLoading(true);
//     Promise.all([fetchBranchesForCompany(), fetchEmployeesForCompany()]).finally(() =>
//       setLoading(false)
//     );
//   }, [user]);

//   // Fetch employees when branch filter changes
//   useEffect(() => {
//     if (selectedEmployeeBranch) {
//       fetchEmployeesByBranch(selectedEmployeeBranch);
//     } else {
//       fetchEmployeesForCompany();
//     }
//   }, [selectedEmployeeBranch]);

//   // Show invite modal handler
//   const handleShowInviteModal = async () => {
//     await fetchBranchesForCompany();
//     setShowInviteModal(true);
//     setInviteError("");
//     setInviteSuccess("");
//     setInviteForm({ email: "", branchId: "", workType: "" });
//   };

//   // Invite submission handler
//   const handleInvite = async (e) => {
//     e.preventDefault();
//     setInviteLoading(true);
//     setInviteError("");
//     setInviteSuccess("");
//     try {
//       await inviteEmployee(inviteForm);
//       setInviteSuccess("Invite sent successfully!");
//       setShowInviteModal(false);
//       setInviteForm({ email: "", branchId: "", workType: "" });
//       // Refresh employees according to current filter
//       if (selectedEmployeeBranch) {
//         fetchEmployeesByBranch(selectedEmployeeBranch);
//       } else {
//         fetchEmployeesForCompany();
//       }
//     } catch (err) {
//       setInviteError(err.response?.data?.message || "Failed to send invite");
//     } finally {
//       setInviteLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   if (loading) {
//     return (
//       <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div
//         className="p-3 text-white d-flex flex-column justify-content-between"
//         style={{
//           width: "260px",
//           background: "linear-gradient(135deg, #0f2027, #2c5364)",
//         }}
//       >
//         <div>
//           <h4 className="mb-4 text-center">⚙️ EasyGo</h4>
//           <div className="text-center mb-4">
//             <Image
//               src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"}&background=2c5364&color=fff&rounded=true`}
//               roundedCircle
//               width={70}
//               height={70}
//               className="mb-2 border border-light"
//               alt="Admin Avatar"
//             />
//             <h6 className="mb-0">{user?.name}</h6>
//             <small className="text-light">{user?.email}</small>
//             <div>
//               <Badge bg="info" className="mt-1">
//                 {user?.role || "Admin"}
//               </Badge>
//             </div>
//           </div>
//           <Nav className="flex-column gap-2">
//             <Nav.Link
//               onClick={() => setActiveSection("branches")}
//               className={`text-white ${
//                 activeSection === "branches" ? "fw-semibold" : ""
//               }`}
//             >
//               🏢 Manage Branches
//             </Nav.Link>
//             <Nav.Link
//               onClick={() => setActiveSection("employees")}
//               className={`text-white ${
//                 activeSection === "employees" ? "fw-semibold" : ""
//               }`}
//             >
//               👥 Manage Employees
//             </Nav.Link>
//           </Nav>
//         </div>
//         <Button variant="outline-light" className="mt-4" onClick={handleLogout}>
//           🚪 Logout
//         </Button>
//       </div>

//       {/* Main Content */}
//       <Container fluid className="p-4 bg-light">
//         <Row className="mb-4">
//           <Col>
//             <h2 className="fw-bold">Welcome, {user?.name} 👋</h2>
//             {user?.company?.name && (
//               <p className="fw-semibold text-primary mb-0">
//                 🏢 {user.company.name}
//               </p>
//             )}
//           </Col>
//         </Row>

//         {activeSection === "branches" && (
//           <Row id="branches" className="mb-4">
//             <Col>
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   {/* Branches component */}
//                   <Branches user={user} branches={branches} />
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         )}

//         {activeSection === "employees" && (
//           <Row id="employees">
//             <Col>
//               <Card className="shadow-sm border-0">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
//                   <h5 className="mb-0">👥 Employees</h5>
//                   <Button
//                     variant="light"
//                     size="sm"
//                     onClick={handleShowInviteModal}
//                   >
//                     + Invite Employee
//                   </Button>
//                 </Card.Header>
//                 <Card.Body>
//                   <Form.Group controlId="employeeBranchFilter" className="mb-3">
//                     <Form.Label>Filter Employees by Branch</Form.Label>
//                     <Form.Select
//                       value={selectedEmployeeBranch}
//                       onChange={(e) => setSelectedEmployeeBranch(e.target.value)}
//                     >
//                       <option value="">All Branches</option>
//                       {branches.map((branch) => (
//                         <option key={branch._id} value={branch._id}>
//                           {branch.name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>

//                   {inviteError && <Alert variant="danger">{inviteError}</Alert>}
//                   {inviteSuccess && (
//                     <Alert variant="success">{inviteSuccess}</Alert>
//                   )}
//                   {employees.length === 0 ? (
//                     <p className="text-muted">No employees registered</p>
//                   ) : (
//                     <Table bordered hover responsive>
//                       <thead>
//                         <tr>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Branch</th>
//                           <th>Work Mode</th>
//                           <th>Actions</th>

//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employees.map((emp) => (
//                           <tr key={emp._id}>
//                             <td>{emp.name}</td>
//                             <td>{emp.email}</td>
//                             <td>{emp.branch?.name || "—"}</td>
//                             <td>{emp.workMode || "—"}</td>

//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         )}

//         {/* Invite Employee Modal */}
//         <Modal
//           show={showInviteModal}
//           onHide={() => setShowInviteModal(false)}
//           centered
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>Invite Employee</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleInvite}>
//               <Form.Group className="mb-3" controlId="inviteEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter employee email"
//                   value={inviteForm.email}
//                   onChange={(e) =>
//                     setInviteForm({ ...inviteForm, email: e.target.value })
//                   }
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="inviteBranch">
//                 <Form.Label>Branch</Form.Label>
//                 <Form.Select
//                   value={inviteForm.branchId}
//                   onChange={(e) =>
//                     setInviteForm({ ...inviteForm, branchId: e.target.value })
//                   }
//                   required
//                 >
//                   <option value="">-- Select Branch --</option>
//                   {branches.map((branch) => (
//                     <option key={branch._id} value={branch._id}>
//                       {branch.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="inviteWorkType">
//                 <Form.Label>Work Type</Form.Label>
//                 <Form.Select
//                   value={inviteForm.workType}
//                   onChange={(e) =>
//                     setInviteForm({ ...inviteForm, workType: e.target.value })
//                   }
//                   required
//                 >
//                   <option value="">-- Select Work Type --</option>
//                   <option value="HYBRID">Hybrid</option>
//                   <option value="OFFICE">Office</option>
//                   <option value="REMOTE">Remote</option>
//                 </Form.Select>
//               </Form.Group>
//               <div className="d-grid">
//                 <Button
//                   type="submit"
//                   variant="success"
//                   disabled={inviteLoading}
//                 >
//                   {inviteLoading ? (
//                     <Spinner animation="border" size="sm" />
//                   ) : (
//                     "Send Invite"
//                   )}
//                 </Button>
//               </div>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Badge,
  Nav,
  Image,
} from "react-bootstrap";
import api from "../../api/client";
import useAuth from "../../hooks/useAuth";
import Branches from "../branches/Branches";
import { inviteEmployee, updateEmployee, deleteEmployee } from "../../api/employees";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("branches");
  const [selectedEmployeeBranch, setSelectedEmployeeBranch] = useState("");

  // Invite Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    branchId: "",
    workType: "",
  });
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Edit Employee Modal State
  const [editModalShow, setEditModalShow] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Fetch branches
  const fetchBranchesForCompany = async () => {
    try {
      if (user?.companyId) {
        const res = await api.get(`/branches/company/${user.companyId}`);
        setBranches(res.data || []);
      }
    } catch (err) {
      console.error("Error fetching branches", err);
      setBranches([]);
    }
  };

  // Fetch employees (all company)
  const fetchEmployeesForCompany = async () => {
    try {
      if (user?.companyId) {
        const res = await api.get(`/employees/company/${user.companyId}`);
        setEmployees(res.data || []);
      }
    } catch (err) {
      console.error("Error fetching employees", err);
      setEmployees([]);
    }
  };

  // Fetch employees filtered by branch
  const fetchEmployeesByBranch = async (branchId) => {
    try {
      if (branchId) {
        const res = await api.get(`/employees/branch/${branchId}`);
        setEmployees(res.data || []);
      } else {
        fetchEmployeesForCompany();
      }
    } catch (err) {
      console.error("Error fetching employees for branch", err);
      setEmployees([]);
    }
  };

  // Load branches and employees initially
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBranchesForCompany(), fetchEmployeesForCompany()]).finally(() =>
      setLoading(false)
    );
  }, [user]);

  // Reload employees when branch filter changes
  useEffect(() => {
    if (selectedEmployeeBranch) {
      fetchEmployeesByBranch(selectedEmployeeBranch);
    } else {
      fetchEmployeesForCompany();
    }
  }, [selectedEmployeeBranch]);

  // Invite Modal handlers
  const handleShowInviteModal = async () => {
    await fetchBranchesForCompany();
    setShowInviteModal(true);
    setInviteError("");
    setInviteSuccess("");
    setInviteForm({ email: "", branchId: "", workType: "" });
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteError("");
    setInviteSuccess("");
    try {
      await inviteEmployee(inviteForm);
      setInviteSuccess("Invite sent successfully!");
      setShowInviteModal(false);
      setInviteForm({ email: "", branchId: "", workType: "" });
      if (selectedEmployeeBranch) {
        fetchEmployeesByBranch(selectedEmployeeBranch);
      } else {
        fetchEmployeesForCompany();
      }
    } catch (err) {
      setInviteError(err.response?.data?.message || "Failed to send invite");
    } finally {
      setInviteLoading(false);
    }
  };

  // Edit Employee handlers
  const handleEditEmployee = (employee) => {
    setEditEmployee({
      _id: employee._id,
      name: employee.name || "",
      email: employee.email || "",
      branchId: employee.branch?._id || "",
      workMode: employee.workMode || "",
    });
    setEditError("");
    setEditModalShow(true);
  };

  const handleSaveEdit = async () => {
    setEditLoading(true);
    setEditError("");
    try {
      await updateEmployee(editEmployee._id, {
        name: editEmployee.name,
        email: editEmployee.email,
        branchId: editEmployee.branchId,
        workMode: editEmployee.workMode,
      });
      setEditModalShow(false);
      if (selectedEmployeeBranch) {
        fetchEmployeesByBranch(selectedEmployeeBranch);
      } else {
        fetchEmployeesForCompany();
      }
    } catch (err) {
      setEditError(err.response?.data?.message || "Failed to update employee");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete Employee handler
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      if (selectedEmployeeBranch) {
        fetchEmployeesByBranch(selectedEmployeeBranch);
      } else {
        fetchEmployeesForCompany();
      }
    } catch (error) {
      alert("Failed to delete employee.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="p-3 text-white d-flex flex-column justify-content-between"
        style={{
          width: "260px",
          background: "linear-gradient(135deg, #0f2027, #2c5364)",
        }}
      >
        <div>
          <h4 className="mb-4 text-center">⚙️ EasyGo</h4>
          <div className="text-center mb-4">
            <Image
              src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"}&background=2c5364&color=fff&rounded=true`}
              roundedCircle
              width={70}
              height={70}
              className="mb-2 border border-light"
              alt="Admin Avatar"
            />
            <h6 className="mb-0">{user?.name}</h6>
            <small className="text-light">{user?.email}</small>
            <div>
              <Badge bg="info" className="mt-1">
                {user?.role || "Admin"}
              </Badge>
            </div>
          </div>
          <Nav className="flex-column gap-2">
            <Nav.Link
              onClick={() => setActiveSection("branches")}
              className={`text-white ${
                activeSection === "branches" ? "fw-semibold" : ""
              }`}
            >
              🏢 Manage Branches
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveSection("employees")}
              className={`text-white ${
                activeSection === "employees" ? "fw-semibold" : ""
              }`}
            >
              👥 Manage Employees
            </Nav.Link>
          </Nav>
        </div>
        <Button variant="outline-light" className="mt-4" onClick={handleLogout}>
          🚪 Logout
        </Button>
      </div>

      {/* Main Content */}
      <Container fluid className="p-4 bg-light">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Welcome, {user?.name} 👋</h2>
            {user?.company?.name && (
              <p className="fw-semibold text-primary mb-0">
                🏢 {user.company.name}
              </p>
            )}
          </Col>
        </Row>

        {activeSection === "branches" && (
          <Row id="branches" className="mb-4">
            <Col>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  {/* Branches component */}
                  <Branches user={user} branches={branches} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeSection === "employees" && (
          <Row id="employees">
            <Col>
              <Card className="shadow-sm border-0">
                <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
                  <h5 className="mb-0">👥 Employees</h5>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={handleShowInviteModal}
                  >
                    + Invite Employee
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Form.Group controlId="employeeBranchFilter" className="mb-3">
                    <Form.Label>Filter Employees by Branch</Form.Label>
                    <Form.Select
                      value={selectedEmployeeBranch}
                      onChange={(e) => setSelectedEmployeeBranch(e.target.value)}
                    >
                      <option value="">All Branches</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {inviteError && <Alert variant="danger">{inviteError}</Alert>}
                  {inviteSuccess && (
                    <Alert variant="success">{inviteSuccess}</Alert>
                  )}
                  {employees.length === 0 ? (
                    <p className="text-muted">No employees registered</p>
                  ) : (
                    <Table bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Branch</th>
                          <th>Work Mode</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((emp) => (
                          <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.branch?.name || "—"}</td>
                            <td>{emp.workMode || "—"}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => handleEditEmployee(emp)}
                              >
                                Edit
                              </Button>{" "}
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDeleteEmployee(emp._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Invite Employee Modal */}
        <Modal
          show={showInviteModal}
          onHide={() => setShowInviteModal(false)}
          centered
        >
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
                <Button
                  type="submit"
                  variant="success"
                  disabled={inviteLoading}
                >
                  {inviteLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Send Invite"
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Employee Modal */}
        <Modal
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editError && <Alert variant="danger">{editError}</Alert>}
            <Form>
              <Form.Group className="mb-3" controlId="editName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editEmployee?.name || ""}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editEmployee?.email || ""}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Select
                  value={editEmployee?.branchId || ""}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, branchId: e.target.value })
                  }
                >
                  <option value="">-- Select Branch --</option>
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="editWorkMode">
                <Form.Label>Work Mode</Form.Label>
                <Form.Select
                  value={editEmployee?.workMode || ""}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, workMode: e.target.value })
                  }
                >
                  <option value="">-- Select Work Mode --</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="OFFICE">Office</option>
                  <option value="REMOTE">Remote</option>
                
                </Form.Select>
              </Form.Group>
              <div className="d-grid">
                <Button
                  variant="success"
                  onClick={handleSaveEdit}
                  disabled={editLoading}
                >
                  {editLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

