// import { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Spinner,
//   Dropdown,
//   Form,
//   ListGroup,
//   Alert,
//   Badge,
// } from "react-bootstrap";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Polyline,
//   Popup,
// } from "react-leaflet";
// import polyline from "polyline";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import { bestRouteForEmployee, notifyRouteForEmployee } from "../../api/routes";
// import api from "../../api/client";
// import Sidebar from "../../components/Sidebar";
// import "./../../styles/EmployeeDashboard.css";

// export default function EmployeeDashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [employee, setEmployee] = useState(null);
//   const [route, setRoute] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [transportMode, setTransportMode] = useState("driving-car");
//   const [error, setError] = useState(null);
//   const [useOfficeTime, setUseOfficeTime] = useState(true);

//   // helper: compute next occurrence ISO
//   function nextOccurrenceISOClient(hhmm, now = new Date()) {
//     if (!hhmm) return null;
//     const [hh, mm] = hhmm.split(":").map(Number);
//     const dt = new Date(now);
//     dt.setHours(hh, mm, 0, 0);
//     if (dt <= now) dt.setDate(dt.getDate() + 1);
//     return dt.toISOString();
//   }

//   // fetch employee profile
//   const fetchMyEmployee = useCallback(async () => {
//     const res = await api.get(`/employees/user/${user._id}`);
//     return res.data;
//   }, [user]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const me = await fetchMyEmployee();
//         setEmployee(me);
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   }, [fetchMyEmployee]);

//   // get best route
//   const getBestRoute = async (useOfficeTimeFlag = true) => {
//     if (!employee?._id) return;
//     setLoading(true);
//     setError(null);
//     try {
//       let departAt = null;
//       if (useOfficeTimeFlag && employee?.officeStartTime) {
//         departAt = nextOccurrenceISOClient(employee.officeStartTime);
//       }
//       const data = await bestRouteForEmployee(
//         employee._id,
//         transportMode,
//         departAt
//       );
//       setRoute(data);
//     } catch (e) {
//       console.error(e);
//       setError(e?.response?.data?.message || "Failed to fetch route");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // notify route updates
//   const notifyMe = async () => {
//     if (!employee?._id) return;
//     try {
//       await notifyRouteForEmployee(employee._id, transportMode);
//       alert("You will see a ROUTE_UPDATE notification.");
//     } catch {
//       alert("Failed to notify");
//     }
//   };

//   // logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   // decode polyline
//   const polyPoints = useMemo(() => {
//     if (!route?.geometry) return [];
//     try {
//       if (Array.isArray(route.geometry)) return route.geometry;
//       const pts = polyline.decode(route.geometry);
//       return pts.map(([lat, lng]) => [lat, lng]);
//     } catch {
//       return [];
//     }
//   }, [route]);

//   const center = polyPoints.length
//     ? polyPoints[Math.floor(polyPoints.length / 2)]
//     : [17.385, 78.486];

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sidebar />

//       <Container fluid className="p-4 bg-light">
//         {/* Header */}
//         <Row className="mb-4">
//           <Col className="d-flex justify-content-between align-items-center">
//             <div>
//               <h2 className="fw-bold">Employee Route Dashboard</h2>
//               <p className="text-muted mb-0">{employee?.email}</p>
//             </div>
//             <Dropdown>
//               <Dropdown.Toggle variant="outline-dark" id="profile-dropdown">
//                 {employee?.name || "Profile"}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//         </Row>

//         {/* Dashboard Cards */}
//         <Row className="mb-4">
//           <Col md={4}>
//             <Card className="shadow-sm border-0 rounded-4">
//               <Card.Body>
//                 <h6>Office Timing</h6>
//                 <h4>
//                   {employee?.officeStartTime || "-"} —{" "}
//                   {employee?.officeEndTime || "-"}
//                 </h4>
//                 <p className="text-muted small">
//                   Work Mode: {employee?.workMode}
//                 </p>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="shadow-sm border-0 rounded-4">
//               <Card.Body>
//                 <h6>Avg. Travel Time</h6>
//                 <h4>{route?.durationMin || "--"} min</h4>
//                 <p className="text-muted small">
//                   Distance: {route?.distanceKm || "--"} km
//                 </p>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Route Section */}
//         <Row>
//           <Col md={8} className="mb-4">
//             <Card className="shadow-sm border-0 rounded-4">
//               <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0">🚦 My Route</h5>
//                 <Form.Select
//                   size="sm"
//                   style={{ width: 160 }}
//                   value={transportMode}
//                   onChange={(e) => setTransportMode(e.target.value)}
//                 >
//                   <option value="driving-car">🚗 Driving</option>
//                   <option value="cycling-regular">🚴 Cycling</option>
//                   <option value="foot-walking">🚶 Walking</option>
//                 </Form.Select>
//               </Card.Header>
//               <Card.Body>
//                 {loading ? (
//                   <div className="text-center p-5">
//                     <Spinner animation="border" /> Fetching best route...
//                   </div>
//                 ) : error ? (
//                   <Alert variant="danger">{error}</Alert>
//                 ) : route ? (
//                   <>
//                     <p>
//                       Distance: <strong>{route.distanceKm} km</strong> | Time:{" "}
//                       <strong>{route.durationMin} min</strong>
//                     </p>
//                     <div style={{ height: 420, marginBottom: "1rem" }}>
//                       <MapContainer
//                         center={center}
//                         zoom={12}
//                         style={{ height: "100%", width: "100%" }}
//                       >
//                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                         {polyPoints.length > 0 && (
//                           <>
//                             <Polyline positions={polyPoints} color="blue" />
//                             <Marker position={polyPoints[0]}>
//                               <Popup>Start</Popup>
//                             </Marker>
//                             <Marker
//                               position={polyPoints[polyPoints.length - 1]}
//                             >
//                               <Popup>Office</Popup>
//                             </Marker>
//                           </>
//                         )}
//                       </MapContainer>
//                     </div>

//                     {/* Next commute info */}
//                     {employee?.officeStartTime && (
//                       <div className="small text-muted mb-2">
//                         Next commute:{" "}
//                         <strong>
//                           {useOfficeTime
//                             ? new Date(
//                                 nextOccurrenceISOClient(
//                                   employee.officeStartTime
//                                 )
//                               ).toLocaleString()
//                             : "Now"}
//                         </strong>
//                       </div>
//                     )}

//                     {/* Turn-by-turn */}
//                     {route.steps && (
//                       <ListGroup variant="flush">
//                         {route.steps.map((step, i) => (
//                           <ListGroup.Item key={i}>
//                             ➡️ {step.instruction}
//                           </ListGroup.Item>
//                         ))}
//                       </ListGroup>
//                     )}

//                     <div className="mt-3 d-flex gap-2">
//                       <Button
//                         variant="primary"
//                         onClick={() => getBestRoute(useOfficeTime)}
//                         disabled={loading}
//                       >
//                         Get Best Route
//                       </Button>
//                       <Button variant="outline-secondary" onClick={notifyMe}>
//                         Notify Me
//                       </Button>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="text-muted">
//                     Click <strong>“Get Best Route”</strong> to see directions.
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Employee Info */}
//           <Col md={4}>
//             <Card className="shadow-sm border-0 rounded-4">
//               <Card.Header className="bg-success text-white">
//                 <h5 className="mb-0">👤 My Info</h5>
//               </Card.Header>
//               <Card.Body>
//                 <p>
//                   <strong>Name:</strong> {user?.name}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {user?.email}
//                 </p>
//                 <p>
//                   <strong>Work Mode:</strong>{" "}
//                   <Badge bg="info">{user?.workMode || "N/A"}</Badge>
//                 </p>
//                 <p>
//                   <strong>Office Hours:</strong>{" "}
//                   {employee?.officeStartTime || "-"} —{" "}
//                   {employee?.officeEndTime || "-"}
//                 </p>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Dropdown,
  Form,
  ListGroup,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import polyline from "polyline";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { bestRouteForEmployee, notifyRouteForEmployee } from "../../api/routes";
import api from "../../api/client";
import Sidebar from "../../components/Sidebar";
import "./../../styles/EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transportMode, setTransportMode] = useState("driving-car");
  const [error, setError] = useState(null);
  const [useOfficeTime, setUseOfficeTime] = useState(true);

  function nextOccurrenceISOClient(hhmm, now = new Date()) {
    if (!hhmm) return null;
    const [hh, mm] = hhmm.split(":").map(Number);
    const dt = new Date(now);
    dt.setHours(hh, mm, 0, 0);
    if (dt <= now) dt.setDate(dt.getDate() + 1);
    return dt.toISOString();
  }

  const fetchMyEmployee = useCallback(async () => {
    const res = await api.get(`/employees/user/${user._id}`);
    return res.data;
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMyEmployee();
        setEmployee(me);
        setRoute({
          durationMin: 42,
          distanceKm: 18.5,
          geometry: [
            [17.385044, 78.486671],
            [17.4074, 78.4746],
            [17.4332, 78.4512],
          ],
          steps: [
            { instruction: "Head northwest on Main Street for 1.2 km" },
            { instruction: "Turn right onto Highway 24, follow for 6.2 km" },
            { instruction: "Continue on Tech Park Road to office" },
          ],
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [fetchMyEmployee]);

  // Map points
  const polyPoints = useMemo(() => {
    if (!route?.geometry) return [];
    try {
      if (Array.isArray(route.geometry)) return route.geometry;
      const pts = polyline.decode(route.geometry);
      return pts.map(([lat, lng]) => [lat, lng]);
    } catch {
      return [];
    }
  }, [route]);
  const center = polyPoints.length
    ? polyPoints[Math.floor(polyPoints.length / 2)]
    : [17.385, 78.486];

  // Demo weather, traffic, time data
  const weatherInfo = {
    icon: "fa-cloud-rain",
    desc: "Rain expected next 3 hours. Drive safely.",
    temp: "Rainy, 18°C",
    delay: "Expected travel delay 15 min",
  };

  const routes = [
    {
      title: "Optimal Route",
      time: "42 min",
      distance: "18.5 km",
      traffic: "Heavy",
      weather: "Rainy",
      trafficIcon: "traffic-high",
      weatherIcon: "fa-cloud-rain",
      selected: true,
    },
    {
      title: "Scenic Route",
      time: "48 min",
      distance: "22.1 km",
      traffic: "Medium",
      weather: "Less Rain",
      trafficIcon: "traffic-medium",
      weatherIcon: "fa-umbrella",
      selected: false,
    },
    {
      title: "Express Route",
      time: "36 min",
      distance: "17.2 km",
      traffic: "Heavy",
      weather: "Accidents",
      trafficIcon: "traffic-high",
      weatherIcon: "fa-exclamation-triangle",
      selected: false,
    },
  ];

  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="main-content flex-1 p-4">
        {/* Header */}
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <h2>Employee Route Dashboard</h2>
          <div className="user-info d-flex align-items-center">
            {/* Employee image REMOVED */}
            <div>
              <h3 style={{ margin: 0 }}>{user?.name || "Employee"}</h3>
              <p className="mb-0">{user?.email}</p>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="profile-dropdown">
                Profile
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div
          className="dashboard"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 20,
          }}
        >
          <Card className="card">
            <Card.Header className="card-header d-flex justify-content-between align-items-center">
              <div className="card-title">Current Location</div>
              <div
                className="card-icon bg-primary-light"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              >
                <i className="fas fa-location-dot"></i>
              </div>
            </Card.Header>
            <div className="card-value">{employee?.city || "Springfield"}</div>
            <div className="card-desc">
              Home to Office Distance {route?.distanceKm || "--"} km
            </div>
          </Card>
          <Card className="card">
            <Card.Header className="card-header d-flex justify-content-between align-items-center">
              <div className="card-title">Office Timing</div>
              <div
                className="card-icon bg-success-light"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              >
                <i className="fas fa-clock"></i>
              </div>
            </Card.Header>
            <div className="card-value">
              {employee?.officeStartTime || "9:00 AM"} -{" "}
              {employee?.officeEndTime || "5:30 PM"}
            </div>
            <div className="card-desc">Flexible start 8:30 AM - 9:30 AM</div>
          </Card>
          <Card className="card">
            <Card.Header className="card-header d-flex justify-content-between align-items-center">
              <div className="card-title">Today's Weather</div>
              <div
                className="card-icon bg-warning-light"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              >
                <i className={`fas ${weatherInfo.icon}`}></i>
              </div>
            </Card.Header>
            <div className="card-value">{weatherInfo.temp}</div>
            <div className="card-desc">{weatherInfo.delay}</div>
          </Card>
          <Card className="card">
            <Card.Header className="card-header d-flex justify-content-between align-items-center">
              <div className="card-title">Avg. Travel Time</div>
              <div
                className="card-icon bg-danger-light"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              >
                <i className="fas fa-car"></i>
              </div>
            </Card.Header>
            <div className="card-value">{route?.durationMin || "--"} min</div>
            <div className="card-desc">Best this week 35 min Wed</div>
          </Card>
        </div>

        {/* Route Section */}
        <div
          className="route-section"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 350px",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <div
            className="map-container"
            style={{ background: "white", borderRadius: 10, padding: 20 }}
          >
            <div style={{ height: 400, marginBottom: "1rem" }}>
              <MapContainer
                center={center}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {polyPoints.length > 0 && (
                  <>
                    <Polyline positions={polyPoints} color="blue" />
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
            <div
              className="highlight"
              style={{ margin: "20px 0 10px 0", color: "#e74c3c" }}
            >
              Total Distance {route?.distanceKm || "--"} km &nbsp; | &nbsp; Est.
              Time {route?.durationMin || "--"} min
            </div>
            <Button variant="primary">
              <i className="fas fa-directions"></i> Start Navigation
            </Button>
          </div>
          <div
            className="route-info"
            style={{ background: "white", borderRadius: 10, padding: 20 }}
          >
            <div className="info-header d-flex align-items-center mb-3">
              <div
                className="weather-icon"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  background: "rgba(52,152,219,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="fas fa-cloud-rain"
                  style={{ fontSize: 28, color: "#3498db" }}
                ></i>
              </div>
              <div className="weather-details">
                <h5 style={{ margin: 0 }}>Weather Advisory</h5>
                <p style={{ color: "#7f8c8d" }}>{weatherInfo.desc}</p>
              </div>
            </div>
            <div
              className="timing-info"
              style={{
                background: "rgba(52,152,219,0.1)",
                padding: 15,
                borderRadius: 8,
                marginBottom: 18,
              }}
            >
              <p>
                Current Time <span>8:15 AM</span>
              </p>
              <p>
                Office Start{" "}
                <span>{employee?.officeStartTime || "9:00 AM"}</span>
              </p>
              <p>
                Depart By <span className="highlight">8:18 AM</span>
              </p>
              <p>
                Estimated Arrival <span>8:57 AM</span>
              </p>
            </div>
            <div>
              <h5 style={{ margin: "25px 0 15px 0" }}>Alternative Routes</h5>
              <div className="route-options">
                {routes.map((r) => (
                  <div
                    className={`route-option ${r.selected ? "selected" : ""}`}
                    key={r.title}
                    style={{
                      padding: 15,
                      borderRadius: 8,
                      marginBottom: 10,
                      border: r.selected
                        ? "2px solid #3498db"
                        : "2px solid #f1f2f6",
                      background: r.selected ? "rgba(52,152,219,0.06)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div className="route-option-header d-flex justify-content-between">
                      <div className="route-title" style={{ fontWeight: 600 }}>
                        {r.title}
                      </div>
                      <div className="route-time" style={{ fontWeight: 700 }}>
                        {r.time}
                      </div>
                    </div>
                    <div
                      className="route-details d-flex"
                      style={{ color: "#7f8c8d", fontSize: 14 }}
                    >
                      <span>
                        <i className="fas fa-road"></i> {r.distance}
                      </span>
                      <span>
                        <i className="fas fa-traffic-light"></i>
                        <span
                          className={`traffic-light ${r.trafficIcon}`}
                        ></span>{" "}
                        {r.traffic}
                      </span>
                      <span>
                        <i className={`fas ${r.weatherIcon}`}></i> {r.weather}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <Button style={{ background: "#27ae60", border: "none" }}>
                  <i className="fas fa-bell"></i> Set Departure Reminder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
