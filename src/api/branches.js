import { api } from "./client";
export const fetchBranchesByCompany = async (companyId) =>
  (await api.get(`/branches/company/${companyId}`)).data;
export const createBranch = async (payload) =>
  (await api.post("/branches", payload)).data;
export const deleteBranch = async (id) =>
  (await api.delete(`/branches/${id}`)).data;
export const getBranch = async (id) => (await api.get(`/branches/${id}`)).data;
export const updateBranch = async (id, payload) =>
  (await api.put(`/branches/${id}`, payload)).data;
