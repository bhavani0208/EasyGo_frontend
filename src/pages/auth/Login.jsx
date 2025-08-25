// import { useState } from "react";
// import {
//   Form,
//   Button,
//   Container,
//   Row,
//   Col,
//   Card,
//   Alert,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");

//     const payload = { email, password };

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // ✅ Save token + user info
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // ✅ Redirect based on role
//         const role = (data.user.role || "").toUpperCase();

//         console.log("User from backend:", data.user);
//         console.log("Role from backend:", data.user.role);

//         if (role === "SUPERADMIN") {
//           navigate("/superadmin-dashboard");
//         } else if (role === "ADMIN") {
//           navigate("/admin-dashboard");
//         } else if (role === "EMPLOYEE") {
//           navigate("/employee-dashboard");
//         } else {
//           navigate("/");
//           console.log("User role from backend:", data.user.role);
//         }
//       } else {
//         setErr(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErr("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Container className="d-flex justify-content-center align-items-center vh-100">
//         <Row className="w-100">
//           <Col md={{ span: 6, offset: 3 }}>
//             <Card className="p-4 shadow-lg rounded-4 bg-dark bg-opacity-75 text-white">
//               <h2 className="text-center mb-3">Welcome Back 👋</h2>
//               <p className="text-center text-light mb-4">
//                 Access your personalized dashboard and stay on track
//               </p>

//               {/* 🔴 Error Message */}
//               {err && <Alert variant="danger">{err}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 {/* Email */}
//                 <Form.Group className="mb-3" controlId="email">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 {/* Password */}
//                 <Form.Group className="mb-3" controlId="password">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 {/* Submit */}
//                 <div className="d-grid">
//                   <Button variant="primary" type="submit" size="lg">
//                     Login
//                   </Button>
//                 </div>
//               </Form>

//               {/* Extra links */}
//               <div className="text-center mt-3">
//                 <a
//                   href="/forgot-password"
//                   className="text-decoration-none text-light"
//                 >
//                   Forgot Password?
//                 </a>
//                 <br />
//                 <span className="text-light">New here? </span>
//                 <a
//                   href="/register-admin"
//                   className="fw-bold text-info text-decoration-none"
//                 >
//                   Register as Admin
//                 </a>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }
import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // ✅ import hook

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login() from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const payload = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ use AuthContext login() instead of localStorage directly
        login(data.token, data.user);

        // ✅ Redirect based on role
        const role = (data.user.role || "").toUpperCase();
        console.log("Logged in user role:", role);

        if (role === "SUPERADMIN") {
          navigate("/superadmin-dashboard");
        } else if (role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (role === "EMPLOYEE") {
          navigate("/employee-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setErr(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4 shadow-lg rounded-4 bg-dark bg-opacity-75 text-white">
              <h2 className="text-center mb-3">Welcome Back 👋</h2>
              <p className="text-center text-light mb-4">
                Access your personalized dashboard and stay on track
              </p>

              {/* 🔴 Error Message */}
              {err && <Alert variant="danger">{err}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Submit */}
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Login
                  </Button>
                </div>
              </Form>

              {/* Extra links */}
              <div className="text-center mt-3">
                <a
                  href="/forgot-password"
                  className="text-decoration-none text-light"
                >
                  Forgot Password?
                </a>
                <br />
                <span className="text-light">New here? </span>
                <a
                  href="/register-admin"
                  className="fw-bold text-info text-decoration-none"
                >
                  Register as Admin
                </a>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
