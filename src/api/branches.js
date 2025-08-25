import api from "./client";

// export const fetchBranchesByCompany = async (companyId) =>
//   (await api.get(`/branches/company/${companyId}`)).data;
// export const createBranch = async (payload) =>
//   (await api.post("/branches", payload)).data;
// export const deleteBranch = async (id) =>
//   (await api.delete(`/branches/${id}`)).data;
export const createBranchApi = async (payload) => {
  const { data } = await api.post("/branches", payload);
  return data;
};

// ✅ Fetch branches for company (admin's company)
export const fetchBranchesApi = async () => {
  const { data } = await api.get("/branches");
  return data;
};
// ✅ Filter by company (for SUPERADMIN dashboard if needed)
export const fetchBranchesByCompanyApi = async (companyId) => {
  const res = await api.get(`/branches/company/${companyId}`);
  return res.data;
};

// ✅ Update branch
export const updateBranchApi = async (id, payload) => {
  const { data } = await api.put(`/branches/${id}`, payload);
  return data;
};

// ✅ Delete branch
export const deleteBranchApi = async (id) => {
  const { data } = await api.delete(`/branches/${id}`);
  return data;
};
