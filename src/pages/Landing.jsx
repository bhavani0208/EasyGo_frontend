
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
        <p className="lead fw-bold text-Green">Choose your Route for Your convenience</p>
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
