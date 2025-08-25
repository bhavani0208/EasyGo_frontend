import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import polyline from "polyline";
import useAuth from "../../hooks/useAuth";
import { bestRouteForEmployee, notifyRouteForEmployee } from "../../api/routes";
import api from "../../api/client";
import Sidebar from "../../components/Sidebar";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch employee profile
  const fetchMyEmployee = useCallback(async () => {
    const res = await api.get(`/employees/user/${user._id}`);
    return res.data;
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMyEmployee();
        setEmployee(me);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [fetchMyEmployee]);

  // ✅ Best route API
  const getBestRoute = async () => {
    if (!employee?._id) return;
    setLoading(true);
    try {
      const data = await bestRouteForEmployee(employee._id, "driving-car");
      setRoute(data);
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Notify API
  const notifyMe = async () => {
    if (!employee?._id) return;
    try {
      await notifyRouteForEmployee(employee._id, "driving-car");
      alert("You will see a ROUTE_UPDATE notification.");
    } catch {
      alert("Failed to notify");
    }
  };

  // ✅ Decode polyline
  const polyPoints = useMemo(() => {
    if (!route?.geometry) return [];
    try {
      const pts = polyline.decode(route.geometry);
      return pts.map(([lat, lng]) => [lat, lng]);
    } catch {
      return [];
    }
  }, [route]);

  const center = polyPoints.length
    ? polyPoints[Math.floor(polyPoints.length / 2)]
    : [17.385, 78.486]; // fallback: Hyderabad

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* ✅ Reusable Sidebar */}
      <Sidebar  />
      

      <Container fluid className="p-4 bg-light">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Welcome, {employee?.name} 👋</h2>
            <p className="text-muted mb-0">{employee?.email}</p>
          </Col>
        </Row>

        <Row>
          {/* ✅ Route Card */}
          <Col md={8} className="mb-4">
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">🚦 My Route</h5>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center p-5">
                    <Spinner animation="border" /> Fetching best route...
                  </div>
                ) : route ? (
                  <>
                    <p>
                      Distance: <strong>{route.distanceKm} km</strong> | Time:{" "}
                      <strong>{route.durationMin} min</strong>
                    </p>
                    <div style={{ height: 480 }}>
                      <MapContainer
                        center={center}
                        zoom={12}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {polyPoints.length > 0 && (
                          <>
                            <Polyline positions={polyPoints} />
                            <Marker position={polyPoints[0]}>
                              <Popup>Start</Popup>
                            </Marker>
                            <Marker position={polyPoints[polyPoints.length - 1]}>
                              <Popup>Office</Popup>
                            </Marker>
                          </>
                        )}
                      </MapContainer>
                    </div>
                  </>
                ) : (
                  <div className="text-muted">
                    Click <strong>“Get Best Route”</strong> to see directions.
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* ✅ Info Card */}
          <Col md={4}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">👤 My Info</h5>
              </Card.Header>
              <Card.Body>
                <p>
                  <strong>Name:</strong> {employee?.name}
                </p>
                <p>
                  <strong>Email:</strong> {employee?.email}
                </p>
                <p>
                  <strong>Work Mode:</strong>{" "}
                  <Badge bg="info">{employee?.workMode || "N/A"}</Badge>
                </p>
                <p>
                  <strong>Office Hours:</strong>{" "}
                  {employee?.officeStartTime || "-"} —{" "}
                  {employee?.officeEndTime || "-"}
                </p>

                <div className="mt-3 d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={getBestRoute}
                    disabled={loading}
                  >
                    Get Best Route
                  </Button>
                  <Button variant="outline-secondary" onClick={notifyMe}>
                    Notify Me
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
