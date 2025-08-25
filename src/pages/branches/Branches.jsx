// import { useEffect, useState } from "react";

// import { Button, Table, Modal, Form, Spinner } from "react-bootstrap";
// import useAuth from "../../hooks/useAuth";
// import {
//   createBranchApi,
//   fetchBranchesApi,
//   fetchBranchesByCompanyApi,
//   updateBranchApi,
//   deleteBranchApi,
// } from "../../api/branches";

// const Branches = () => {
//   const { user } = useAuth();
//   const [branches, setBranches] = useState([]);
//   //const [companies, setCompanies] = useState([]);
//    const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("add");
//   const [currentBranch, setCurrentBranch] = useState({
//     name: "",
//     address: "",
//     companyId: "",
//   });

//   // ✅ Fetch branches
//   const fetchBranches = async () => {
//     try {
//       if (user?.role === "SUPERADMIN") {
//         // superadmin should see ALL branches
//         const { data } = await api.get("/branches");
//         setBranches(data);
//       } else if (user?.role === "ADMIN") {
//         const companyId = user?.companyId || user?.company?._id;
//         if (!companyId) {
//           console.error("No companyId found for this ADMIN user");
//           return;
//         }
//         const { data } = await api.get(`/branches/company/${companyId}`);
//         setBranches(data);
//       }
//     } catch (err) {
//       console.error("Error fetching branches", err);
//     }
//   };

//   // ✅ Fetch companies only for SUPERADMIN
//   const fetchCompanies = async () => {
//     try {
//       const res = await api.get("/companies");
//       setCompanies(res.data);
//     } catch (err) {
//       console.error("Error fetching companies", err);
//     }
//   };

//   useEffect(() => {
//     fetchBranches();
//     fetchCompanies();
//   }, [user]);

//   const handleShowAdd = () => {
//     setModalType("add");

//     if (user?.role === "ADMIN") {
//       // Pre-fill companyId for admin
//       console.log("user.company?._id");
//       setCurrentBranch({ name: "" });
//     } else {
//       setCurrentBranch({ name: "" });
//     }
//     setShowModal(true);
//   };

//   const handleShowEdit = (branch) => {
//     setModalType("edit");
//     setCurrentBranch({
//       ...branch,
//       companyId: branch.companyId || "",
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await api.delete(`/branches/${id}`);
//       fetchBranches();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // const handleSave = async () => {
//   //   try {
//   //     const payload = {
//   //       name: currentBranch.name,
//   //       companyId:
//   //         user?.role === "ADMIN" ? user.company?._id : currentBranch.companyId,
//   //     };

//   //     if (modalType === "add") {
//   //       await api.post("/branches", payload);
//   //     } else {
//   //       await api.put(`/branches/${currentBranch._id}`, payload);
//   //     }
//   //     setShowModal(false);
//   //     fetchBranches();
//   //   } catch (err) {
//   //     console.error("Error saving branch", err);
//   //   }
//   // };
//   const handleSave = async () => {
//     try {
//       const payload = {
//         name: currentBranch.name,
//         address: currentBranch.address,
//         companyId:
//           user?.role === "ADMIN"
//             ? user.companyId || user.company?._id
//             : currentBranch.companyId,
//       };

//       if (modalType === "add") {
//         await api.post("/branches", payload);
//       } else {
//         await api.put(`/branches/${currentBranch._id}`, payload);
//       }

//       setShowModal(false);
//       fetchBranches();
//     } catch (err) {
//       console.error("Error saving branch", err);
//     }
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5>🏢 Branches</h5>
//         <Button size="sm" onClick={handleShowAdd}>
//           + Add Branch
//         </Button>
//       </div>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Company</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {branches.map((branch) => (
//             <tr key={branch._id}>
//               <td>{branch.name}</td>
//               <td>{branch.address}</td>
//               <td>{branch.company?.name}</td>

//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   onClick={() => handleShowEdit(branch)}
//                 >
//                   Edit
//                 </Button>{" "}
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete(branch._id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalType === "add" ? "Add Branch" : "Edit Branch"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Branch Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentBranch.name}
//                 onChange={(e) =>
//                   setCurrentBranch({ ...currentBranch, name: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentBranch.address}
//                 onChange={(e) =>
//                   setCurrentBranch({
//                     ...currentBranch,
//                     address: e.target.value,
//                   })
//                 }
//               />
//             </Form.Group>

//             {user?.role === "SUPERADMIN" && (
//               <Form.Group className="mt-3">
//                 <Form.Label>Company</Form.Label>
//                 <Form.Select
//                   required
//                   value={currentBranch.companyId}
//                   onChange={(e) =>
//                     setCurrentBranch({
//                       ...currentBranch,
//                       companyId: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="">-- Select Company --</option>
//                   {companies.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             )}

//             {/* {user?.role === "ADMIN" && (
//               <Form.Group className="mt-3">
//                 <Form.Label>Company</Form.Label>
//                 <Form.Control
//                   type="text"
//                   //value={user.company?.name || ""}
//                   readOnly
//                 />
//               </Form.Group>
//             )} */}
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Branches;
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import {
  createBranchApi,
  fetchBranchesApi,
  fetchBranchesByCompanyApi,
  updateBranchApi,
  deleteBranchApi,
} from "../../api/branches";

const Branches = () => {
  const { user } = useAuth();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [branchForm, setBranchForm] = useState({ name: "", address: "" });

  // ✅ Fetch branches based on role
  const loadBranches = async () => {
    setLoading(true);
    try {
      let data;
      if (user.role === "ADMIN") {
        // 🔹 Admin sees only their company branches
        data = await fetchBranchesByCompanyApi(user.companyId);
      } else if (user.role === "SUPERADMIN") {
        // 🔹 Superadmin sees all branches
        data = await fetchBranchesApi();
      }
      setBranches(data);
    } catch (error) {
      console.error("❌ Error fetching branches:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBranches();
  }, [user]);

  // ✅ Handle form input
  const handleChange = (e) => {
    setBranchForm({ ...branchForm, [e.target.name]: e.target.value });
  };

  // ✅ Handle create/update
  const handleSave = async () => {
    try {
      if (editingBranch) {
        await updateBranchApi(editingBranch._id, branchForm);
      } else {
        await createBranchApi({ ...branchForm, companyId: user.companyId });
      }
      loadBranches();
      setShowModal(false);
      setEditingBranch(null);
      setBranchForm({ name: "", address: "" });
    } catch (error) {
      console.error("❌ Error saving branch:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteBranchApi(id);
      loadBranches();
    } catch (error) {
      console.error("❌ Error deleting branch:", error);
    }
  };

  return (
    <div className="p-3">
      <h3>Branches</h3>

      <Button className="mb-3" onClick={() => setShowModal(true)}>
        + Add Branch
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch._id}>
                <td>{branch.name}</td>
                <td>{branch.address}</td>
                <td>{branch.company?.name || "—"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      setEditingBranch(branch);
                      setBranchForm({
                        name: branch.name,
                        address: branch.address,
                      });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(branch._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBranch ? "Edit Branch" : "Add Branch"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={branchForm.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={branchForm.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Branches;
