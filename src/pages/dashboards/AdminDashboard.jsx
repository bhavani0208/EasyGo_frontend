import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
  Nav,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/client";
import Branches from "../branches/Branches";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [branches, setBranches] = useState([]);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteBranch, setInviteBranch] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setUser(parsedUser);
  //   }

  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       // ✅ Fetch branches for this company
  //       const branchRes = await api.get("/branches", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setBranches(branchRes.data);

  //       const empRes = await api.get("/employees", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setEmployees(empRes.data);

  //       const userRes = await api.get("/auth/me", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUser(userRes.data);
  //       localStorage.setItem("user", JSON.stringify(userRes.data));
  //     } catch (err) {
  //       console.error("Error fetching admin data", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        let branchesData = [];
        if (user?.role === "ADMIN") {
          const companyId = user.companyId || user.company?._id;
          if (companyId) {
            const branchRes = await api.get(`/branches/company/${companyId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            branchesData = branchRes.data;
          }
        } else {
          const branchRes = await api.get("/branches", {
            headers: { Authorization: `Bearer ${token}` },
          });
          branchesData = branchRes.data;
        }
        setBranches(branchesData);

        const empRes = await api.get("/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(empRes.data);

        const userRes = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
        localStorage.setItem("user", JSON.stringify(userRes.data));
      } catch (err) {
        console.error("Error fetching admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInvite = async (e) => {
    // e.preventDefault();
    // try {
    //   const token = localStorage.getItem("token");
    //   await api.post(
    //     "/employees/invite",
    //     { email: inviteEmail, branchId: inviteBranch },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   alert("Invitation sent successfully!");
    //   setShowInvite(false);
    //   setInviteEmail("");
    //   setInviteBranch("");
    // } catch (err) {
    //   console.error("Error sending invite", err);
    //   alert("Failed to send invitation.");
    // }
    try {
      const token = localStorage.getItem("token");
      const companyId = user.companyId || user.company?._id;
      if (!companyId) {
        alert("No companyId found for this ADMIN user");
        return;
      }
      if (companyId) {
        const branchRes = await api.get(`/branches/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranches(branchRes.data);
      }

      setShowInvite(true);
    } catch (err) {
      console.error("Error fetching branches for invite", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
              src={`https://ui-avatars.com/api/?name=${
                user?.name || "Admin"
              }&background=2c5364&color=fff&rounded=true`}
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
            <Nav.Link href="#dashboard" className="text-white">
              📊 Dashboard
            </Nav.Link>
            <Nav.Link href="#branches" className="text-white">
              🏢 Manage Branches
            </Nav.Link>
            <Nav.Link href="#employees" className="text-white">
              👥 Manage Employees
            </Nav.Link>
            <Nav.Link href="#reports" className="text-white">
              📑 Reports
            </Nav.Link>
            <Nav.Link href="#settings" className="text-white">
              ⚙️ Settings
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

        {/* ✅ Use Branches Component here */}
        <Row id="branches" className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Branches user={user} branches={branches} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Employees Section */}
        <Row id="employees">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
                <h5 className="mb-0">👥 Employees</h5>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => setShowInvite(true)}
                >
                  + Invite Employee
                </Button>
              </Card.Header>
              <Card.Body>
                {employees.length === 0 ? (
                  <p className="text-muted">No employees registered</p>
                ) : (
                  <Table hover responsive className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Work Type</th>
                        <th>Branch</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((e) => (
                        <tr key={e._id}>
                          <td className="fw-semibold">{e.name || "—"}</td>
                          <td>{e.email}</td>
                          <td>{e.workType || "—"}</td>
                          <td>{e.branch?.name || "—"}</td>
                          <td>
                            <Badge
                              bg={
                                e.status === "Active" ? "success" : "secondary"
                              }
                            >
                              {e.status || "Active"}
                            </Badge>
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

        {/* Invite Modal */}
        <Modal show={showInvite} onHide={() => setShowInvite(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>📧 Invite Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleInvite}>
              <Form.Group className="mb-3" controlId="inviteEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter employee email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="inviteBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Select
                  value={inviteBranch}
                  onChange={(e) => setInviteBranch(e.target.value)}
                  required
                >
                  <option value="">Select branch</option>
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}

                  {/* Branch options come from Branches component state, we could lift state up if needed */}
                </Form.Select>
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" variant="success">
                  Send Invite
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
