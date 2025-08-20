import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Container className="py-5">
      <Row className="text-center">
        <Col>
          <h1>Welcome to EasyGo</h1>
          <p>Routing & Notification for multi-tenant companies.</p>
          <div className="d-flex gap-3 justify-content-center mt-4">
            <Button as={Link} to="/login" variant="primary">
              Login
            </Button>
            <Button as={Link} to="/register-admin" variant="outline-primary">
              Register (Admin)
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
