import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function EmployeeDashboard() {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load employee from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const fetchRoute = useCallback(async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:5000/api/routes/employee/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRoute(data);
    } catch (err) {
      console.error("Error fetching route:", err);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="p-3 text-white d-flex flex-column justify-content-between"
        style={{
          width: "250px",
          background: "linear-gradient(135deg, #1a2a6c, #2a5298)",
        }}
      >
        <div>
          <h4 className="mb-4">🚦 EasyGo</h4>
          <Nav className="flex-column gap-2">
            <Nav.Link href="#" className="text-white">
              Dashboard
            </Nav.Link>
            <Nav.Link href="#">My Routes</Nav.Link>
            <Nav.Link href="#">Company Locations</Nav.Link>
            <Nav.Link href="#">Analytics</Nav.Link>
            <Nav.Link href="#">Settings</Nav.Link>
          </Nav>
        </div>

        {/* Logout button in sidebar bottom */}
        <Button variant="outline-light" className="mt-4" onClick={handleLogout}>
          🚪 Logout
        </Button>
      </div>

      {/* Main Content */}
      <Container fluid className="p-4">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold">
              Employee Route Dashboard{" "}
              {user?.name ? `- Welcome, ${user.name}` : ""}
            </h2>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                onClick={fetchRoute}
                disabled={loading}
              >
                🔄 Refresh Route
              </Button>
              {/* <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button> */}
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <Card className="p-3 shadow-sm">
              <h5>My Daily Route</h5>

              {loading ? (
                <div className="text-center p-5">
                  <Spinner animation="border" /> Fetching best route...
                </div>
              ) : route && route.geometry?.coordinates?.length ? (
                <>
                  <p>
                    Distance:{" "}
                    <strong>{(route.distance_m / 1000).toFixed(1)} km</strong> |{" "}
                    Time:{" "}
                    <strong>{Math.round(route.duration_s / 60)} min</strong>
                  </p>

                  <div style={{ height: "400px", width: "100%" }}>
                    <MapContainer
                      center={[
                        route.geometry.coordinates[0][1],
                        route.geometry.coordinates[0][0],
                      ]}
                      zoom={12}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />
                      <Marker
                        position={[
                          route.geometry.coordinates[0][1],
                          route.geometry.coordinates[0][0],
                        ]}
                        icon={markerIcon}
                      >
                        <Popup>Home</Popup>
                      </Marker>
                      <Marker
                        position={[
                          route.geometry.coordinates.at(-1)[1],
                          route.geometry.coordinates.at(-1)[0],
                        ]}
                        icon={markerIcon}
                      >
                        <Popup>Office</Popup>
                      </Marker>
                      <Polyline
                        positions={route.geometry.coordinates.map((c) => [
                          c[1],
                          c[0],
                        ])}
                        color="blue"
                        weight={4}
                      />
                    </MapContainer>
                  </div>
                </>
              ) : (
                <p>No route found for this employee.</p>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
