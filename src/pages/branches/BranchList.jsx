import { useEffect, useState } from "react";
import { Container, Card, Button, Table } from "react-bootstrap";
import { fetchBranchesByCompany, deleteBranch } from "../../api/branches";
import useAuthContext from "../../hooks/useAuth";

export default function BranchList() {
  const { user } = useAuthContext();
  const companyId = user?.company;
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBranchesByCompany(companyId);
        setBranches(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [companyId]);

  const handleDelete = async (id) => {
    await deleteBranch(id);
    setBranches((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <Container className="py-4">
      <Card className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Branches</h4>
          <Button href="/branches/create">Add Branch</Button>
        </div>
        {loading ? (
          <div>Loading…</div>
        ) : (
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr key={b._id}>
                  <td>{b.name}</td>
                  <td>{b.address}</td>
                  <td className="text-end">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      href={`/branches/${b._id}/edit`}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(b._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}
