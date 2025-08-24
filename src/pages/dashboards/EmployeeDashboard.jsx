// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Nav,
//   Spinner,
// } from "react-bootstrap";
// import { useState, useEffect, useCallback } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Polyline,
//   Popup,
// } from "react-leaflet";
// import { Icon } from "leaflet";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const markerIcon = new Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function EmployeeDashboard() {
//   const [route, setRoute] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Load employee from localStorage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   const fetchRoute = useCallback(async () => {
//     if (!user?._id) return;
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         `http://localhost:5000/api/routes/employee/${user._id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setRoute(data);
//     } catch (err) {
//       console.error("Error fetching route:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [user?._id]);

//   useEffect(() => {
//     fetchRoute();
//   }, [fetchRoute]);

//   // ✅ Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div
//         className="p-3 text-white d-flex flex-column justify-content-between"
//         style={{
//           width: "250px",
//           background: "linear-gradient(135deg, #1a2a6c, #2a5298)",
//         }}
//       >
//         <div>
//           <h4 className="mb-4">🚦 EasyGo</h4>
//           <Nav className="flex-column gap-2">
//             <Nav.Link href="#" className="text-white">
//               Dashboard
//             </Nav.Link>
//             <Nav.Link href="#">My Routes</Nav.Link>
//             <Nav.Link href="#">Company Locations</Nav.Link>
//             <Nav.Link href="#">Analytics</Nav.Link>
//             <Nav.Link href="#">Settings</Nav.Link>
//           </Nav>
//         </div>

//         {/* Logout button in sidebar bottom */}
//         <Button variant="outline-light" className="mt-4" onClick={handleLogout}>
//           🚪 Logout
//         </Button>
//       </div>

//       {/* Main Content */}
//       <Container fluid className="p-4">
//         <Row>
//           <Col className="d-flex justify-content-between align-items-center">
//             <h2 className="fw-bold">
//               Employee Route Dashboard{" "}
//               {user?.name ? `- Welcome, ${user.name}` : ""}
//             </h2>
//             <div className="d-flex gap-2">
//               <Button
//                 variant="outline-primary"
//                 onClick={fetchRoute}
//                 disabled={loading}
//               >
//                 🔄 Refresh Route
//               </Button>
//               {/* <Button variant="danger" onClick={handleLogout}>
//                 Logout
//               </Button> */}
//             </div>
//           </Col>
//         </Row>

//         <Row className="mt-4">
//           <Col md={12}>
//             <Card className="p-3 shadow-sm">
//               <h5>My Daily Route</h5>

//               {loading ? (
//                 <div className="text-center p-5">
//                   <Spinner animation="border" /> Fetching best route...
//                 </div>
//               ) : route && route.geometry?.coordinates?.length ? (
//                 <>
//                   <p>
//                     Distance:{" "}
//                     <strong>{(route.distance_m / 1000).toFixed(1)} km</strong> |{" "}
//                     Time:{" "}
//                     <strong>{Math.round(route.duration_s / 60)} min</strong>
//                   </p>

//                   <div style={{ height: "400px", width: "100%" }}>
//                     <MapContainer
//                       center={[
//                         route.geometry.coordinates[0][1],
//                         route.geometry.coordinates[0][0],
//                       ]}
//                       zoom={12}
//                       style={{ height: "100%", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="&copy; OpenStreetMap contributors"
//                       />
//                       <Marker
//                         position={[
//                           route.geometry.coordinates[0][1],
//                           route.geometry.coordinates[0][0],
//                         ]}
//                         icon={markerIcon}
//                       >
//                         <Popup>Home</Popup>
//                       </Marker>
//                       <Marker
//                         position={[
//                           route.geometry.coordinates.at(-1)[1],
//                           route.geometry.coordinates.at(-1)[0],
//                         ]}
//                         icon={markerIcon}
//                       >
//                         <Popup>Office</Popup>
//                       </Marker>
//                       <Polyline
//                         positions={route.geometry.coordinates.map((c) => [
//                           c[1],
//                           c[0],
//                         ])}
//                         color="blue"
//                         weight={4}
//                       />
//                     </MapContainer>
//                   </div>
//                 </>
//               ) : (
//                 <p>No route found for this employee.</p>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }
import { Container, Row, Col, Card, Button, Nav, Spinner } from "react-bootstrap";
import { useState, useEffect, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import polyline from "polyline";
import useAuth from "../../hooks/useAuth";
import { bestRouteForEmployee, notifyRouteForEmployee } from "../../api/routes";
import api from "../../api/client";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  // you may have an endpoint to fetch employee by user id, or the dashboard provides id elsewhere.
  const fetchMyEmployee = useCallback(async () => {
    // adapt to your backend (you had /employees?user=me or /employees/me optional)
    const res = await api.get(`/employees/user/${user._id}`); // change if needed
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

  const getBestRoute = async () => {
    if (!employee?._id) return;
    setLoading(true);
    try {
      const data = await bestRouteForEmployee(employee._id, "driving-car");
      setRoute(data); // { distanceKm, durationMin, geometry, employee, branch }
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };

  const notifyMe = async () => {
    if (!employee?._id) return;
    try {
      await notifyRouteForEmployee(employee._id, "driving-car");
      alert("You will see a ROUTE_UPDATE notification.");
    } catch (e) {
      alert("Failed to notify");
    }
  };

  // decode encoded polyline to latlngs
  const polyPoints = useMemo(() => {
    if (!route?.geometry) return [];
    try {
      const pts = polyline.decode(route.geometry); // [[lat,lng], ...]
      return pts.map(([lat, lng]) => [lat, lng]);
    } catch {
      return [];
    }
  }, [route]);

  // center map roughly between first/last
  const center = polyPoints.length ? polyPoints[Math.floor(polyPoints.length / 2)] : [17.385, 78.486]; // Hyderabad fallback

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="p-3 text-white" style={{ width: 250, background: "linear-gradient(135deg,#1a2a6c,#2a5298)" }}>
        <h4 className="mb-4">🚦 EasyGo</h4>
        <Nav className="flex-column gap-2">
          <Button variant="light" onClick={getBestRoute} disabled={loading}>Get Best Route</Button>
          <Button variant="outline-light" onClick={notifyMe}>Notify Me</Button>
        </Nav>
      </div>

      <Container fluid className="p-4" style={{ background: "#f5f7fb" }}>
        <Row>
          <Col md={8}>
            <Card className="shadow-sm rounded-4">
              <Card.Body>
                <h5 className="mb-3">Route</h5>
                {loading ? (
                  <div className="text-center p-5"><Spinner animation="border" /> Fetching best route...</div>
                ) : route ? (
                  <>
                    <p>
                      Distance: <strong>{route.distanceKm} km</strong> | Time: <strong>{route.durationMin} min</strong>
                    </p>
                    <div style={{ height: 480 }}>
                      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {polyPoints.length > 0 && (
                          <Polyline positions={polyPoints} />
                        )}
                        {/* Optional: put markers at ends */}
                        {polyPoints.length > 0 && (
                          <>
                            <Marker position={polyPoints[0]}><Popup>Start</Popup></Marker>
                            <Marker position={polyPoints[polyPoints.length - 1]}><Popup>Office</Popup></Marker>
                          </>
                        )}
                      </MapContainer>
                    </div>
                  </>
                ) : (
                  <div className="text-muted">Click “Get Best Route”.</div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm rounded-4">
              <Card.Body>
                <h5>My Info</h5>
                <div>Name: {employee?.name}</div>
                <div>Email: {employee?.email}</div>
                <div>Work Mode: {employee?.workMode}</div>
                <div>Office Hours: {employee?.officeStartTime || "-"} — {employee?.officeEndTime || "-"}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
