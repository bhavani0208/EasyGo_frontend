// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Alert,
//   Spinner,
// } from "react-bootstrap";
// import { acceptInvitation } from "../../api/employees";

// export default function EmployeeRegistrationForm() {
//   const { token } = useParams(); // invite token from URL
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     address: "", // added address field
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
//     setError("");
//     setLoading(true);

//     try {
//       await acceptInvitation({
//         name: form.name,
//         address: form.address, // send address to backend
//         password: form.password,
//       });

//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       console.error("Registration failed", err);
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Row>
//         <Col>
//           <Card className="shadow-sm p-4" style={{ width: "400px" }}>
//             <h3 className="text-center mb-3">Employee Registration</h3>

//             {error && <Alert variant="danger">{error}</Alert>}
//             {success && <Alert variant="success">{success}</Alert>}

//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   name="name"
//                   type="text"
//                   placeholder="Enter full name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Address</Form.Label> {/* new address field */}
//                 <Form.Control
//                   name="address"
//                   type="text"
//                   placeholder="Enter address"
//                   value={form.address}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   name="password"
//                   type="password"
//                   placeholder="Enter password"
//                   value={form.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   name="confirmPassword"
//                   type="password"
//                   placeholder="Confirm password"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <div className="d-grid">
//                 <Button type="submit" variant="success" disabled={loading}>
//                   {loading ? (
//                     <Spinner animation="border" size="sm" />
//                   ) : (
//                     "Register"
//                   )}
//                 </Button>
//               </div>
//             </Form>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import api from "../../api/client";
import { acceptInvitation } from "../../api/employees";

export default function EmployeeRegistrationForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const formElement = e.currentTarget;
    e.preventDefault();

    // Check builtin validations
    if (formElement.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Custom validation for password confirmation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setValidated(true);
    setLoading(true);

    try {
      await acceptInvitation(
        {
          name: form.name,
          address: form.address,
          password: form.password,
        },
        token
      );
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="shadow-sm p-4" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-3">Employee Registration</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your full name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                  isInvalid={
                    validated && form.password !== form.confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="success" disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
