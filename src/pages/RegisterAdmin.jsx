// import { useState } from "react";
// import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// export default function RegisterAdmin() {
//   const [companyName, setCompanyName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ companyName, email, password });
//     // 🔗 Here you will call your backend API to register admin
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Row>
//         <Col>
//           <Card className="p-4 shadow rounded-4">
//             <h2 className="text-center mb-4">Admin Registration</h2>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3" controlId="companyName">
//                 <Form.Label>Company Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter company name"
//                   value={companyName}
//                   onChange={(e) => setCompanyName(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="password">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <div className="d-grid">
//                 <Button variant="primary" type="submit">
//                   Register
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
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function RegisterAdmin() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ companyName, email, password });
    // 🔗 Call backend API for admin registration
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-lg rounded-4 bg-light bg-opacity-75">
              <h2 className="text-center mb-4 fw-bold text-primary">
                Admin Registration
              </h2>
              <p className="text-center text-muted mb-4">
                📍 Optimize your company’s commute with EasyGo
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="companyName">
                  <Form.Label className="fw-semibold">
                    🏢 Company Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-semibold">📧 Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="fw-semibold">🔒 Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    🚀 Register
                  </Button>
                  <Button variant="outline-secondary" size="lg" href="/login">
                    🔙 Back to Login
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
