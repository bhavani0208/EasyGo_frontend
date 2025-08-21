// import { Container, Row, Col, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function Landing() {
//   return (
//     <Container className="py-5">
//       <Row className="text-center">
//         <Col>
//           <h1>Welcome to EasyGo</h1>
//           <p>Choose Your Route</p>
//           <div className="d-flex gap-3 justify-content-center mt-4">
//             <Button as={Link} to="/login" variant="primary">
//               Login
//             </Button>
//             <Button as={Link} to="/register-admin" variant="outline-primary">
//               Register (Admin)
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// import { Container, Row, Col, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function Landing() {
//   return (
//     <div
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1519994007676-baabab4bf574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZmZpY3xlbnwwfHwwfHx8MA%3D%3D')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//       }}
//     >
//       <Container className="text-center bg-dark bg-opacity-50 p-5 rounded-4 shadow-lg">
//         <Row>
//           <Col>
//             <h1 className="fw-bold display-4">🚦 Welcome to EasyGo</h1>
//             <p className="lead">Smart Traffic Route Management System</p>
//             <div className="d-flex gap-3 justify-content-center mt-4">
//               <Button as={Link} to="/login" variant="primary" size="lg">
//                 Login
//               </Button>
//               <Button
//                 as={Link}
//                 to="/register-admin"
//                 variant="outline-light"
//                 size="lg"
//               >
//                 Register (Admin)
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      className="bg-dark text-white d-flex flex-column min-vh-100"
      style={{
        backgroundImage:
          "url('https://ideogram.ai/assets/progressive-image/balanced/response/Q7ovOr67TPeHYR59wxfUPw')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Heading at the top */}
      <header className="text-center py-5">
        <h1 className="fw-bold display-4">🚦 Welcome to EasyGo</h1>
        <p className="lead">Choose your Route for Your convenience</p>
      </header>

      {/* Centered buttons */}
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Row>
          <Col className="text-center">
            <div className="d-flex flex-column gap-4">
              <Button
                as={Link}
                to="/login"
                variant="primary"
                size="lg"
                className="px-5 py-3 fw-semibold shadow"
              >
                🚗 Login
              </Button>
              <Button
                as={Link}
                to="/register-admin"
                variant="light"
                size="lg"
                className="px-5 py-3 fw-semibold shadow"
              >
                🏢 Register (Admin)
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="text-center py-3 text-light-50">
        © {new Date().getFullYear()} EasyGo | Smarter Commute
      </footer>
    </div>
  );
}
