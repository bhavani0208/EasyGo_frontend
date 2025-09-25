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
import { Card, Button, Dropdown, Badge } from "react-bootstrap";
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
import api from "../../api/client";
import "./../../styles/EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [route, setRoute] = useState(null);

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
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [fetchMyEmployee]);

  const handleProfileClick = () => {
    if (user?._id) {
      navigate(`/employee/profile/${user._id}`);
    }
  };

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

  // Weather and routes demo data
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
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          height: "100vh",
          background: "linear-gradient(135deg, #232526, #414345)",
          color: "white",
          padding: "32px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h4 className="mb-4 text-center">🚦 EasyGo</h4>
          <div className="text-center mb-4">
            <span
              style={{
                display: "inline-block",
                width: 64,
                height: 64,
                borderRadius: 32,
                background: "#fff",
                color: "#232526",
                lineHeight: "64px",
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {user?.name?.[0] || "U"}
            </span>
            <h6 className="mb-0">{user?.name}</h6>
            <small>{user?.email}</small>
            <div>
              <Badge bg="info" className="mt-1">
                Employee
              </Badge>
            </div>
          </div>
          <div className="side-nav mt-3">
            {/* <div className="mb-2 fw-semibold" style={{ color: "#ddd" }}>
              Settings
            </div> */}
            <button
              className="btn btn-link text-white px-0"
              style={{ textAlign: "left" }}
              onClick={handleProfileClick}
            >
              Profile
            </button>
            {/* Add more settings or navigation buttons here as needed */}
          </div>
        </div>

        <Button
          variant="outline-light"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          🚪 Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "40px 48px",
          background: "#f8f9fb",
          overflowX: "auto",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Employee Route Dashboard</h2>
          <div className="d-flex align-items-center">
            <div>
              <h3 style={{ margin: 0 }}>{user?.name || "Employee"}</h3>
              <p className="mb-0">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 20,
          }}
        >
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>Current Location</div>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#cfe2ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#084298",
                }}
              >
                <i className="fas fa-location-dot"></i>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{employee?.city || "Springfield"}</Card.Text>
              <small>
                Home to Office Distance {route?.distanceKm || "--"} km
              </small>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>Office Timing</div>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#d1e7dd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#0f5132",
                }}
              >
                <i className="fas fa-clock"></i>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {employee?.officeStartTime || "9:00 AM"} -{" "}
                {employee?.officeEndTime || "5:30 PM"}
              </Card.Text>
              <small>Flexible start 8:30 AM - 9:30 AM</small>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>Today's Weather</div>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#fff3cd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#664d03",
                }}
              >
                <i className={`fas ${weatherInfo.icon}`}></i>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{weatherInfo.temp}</Card.Text>
              <small>{weatherInfo.delay}</small>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>Avg. Travel Time</div>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#f8d7da",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#842029",
                }}
              >
                <i className="fas fa-car"></i>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{route?.durationMin || "--"} min</Card.Text>
              <small>Best this week 35 min Wed</small>
            </Card.Body>
          </Card>
        </div>

        {/* Route Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 350px",
            gap: 20,
            marginTop: 30,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <div style={{ height: 400, marginBottom: 16 }}>
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
            <div style={{ color: "#e74c3c", marginBottom: 12 }}>
              Total Distance {route?.distanceKm || "--"} km &nbsp; | &nbsp; Est.
              Time {route?.durationMin || "--"} min
            </div>
            <Button variant="primary">
              <i className="fas fa-directions"></i> Start Navigation
            </Button>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <div className="d-flex align-items-center mb-3">
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  background: "rgba(52,152,219,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3498db",
                  fontSize: 28,
                }}
              >
                <i className="fas fa-cloud-rain"></i>
              </div>
              <div style={{ marginLeft: 12 }}>
                <h5 style={{ margin: 0 }}>Weather Advisory</h5>
                <p style={{ color: "#7f8c8d", marginBottom: 0 }}>
                  {weatherInfo.desc}
                </p>
              </div>
            </div>
            <div
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
                Depart By <span style={{ color: "#e74c3c" }}>8:18 AM</span>
              </p>
              <p>
                Estimated Arrival <span>8:57 AM</span>
              </p>
            </div>
            <h5 style={{ marginBottom: 15 }}>Alternative Routes</h5>
            {routes.map((r) => (
              <div
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
                className={r.selected ? "selected-route" : ""}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{ fontWeight: 600 }}
                >
                  <div>{r.title}</div>
                  <div style={{ fontWeight: 700 }}>{r.time}</div>
                </div>
                <div
                  className="d-flex"
                  style={{ color: "#7f8c8d", fontSize: 14, gap: 12 }}
                >
                  <span>
                    <i className="fas fa-road"></i> {r.distance}
                  </span>
                  <span>
                    <i className="fas fa-traffic-light"></i> {r.traffic}
                  </span>
                  <span>
                    <i className={`fas ${r.weatherIcon}`}></i> {r.weather}
                  </span>
                </div>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Button style={{ background: "#27ae60", border: "none" }}>
                <i className="fas fa-bell"></i> Set Departure Reminder
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
