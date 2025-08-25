import api from "./client";

export const fetchCompanies = async () => (await api.get("/companies")).data;

export const createCompany = async (company) =>
  (await api.post("/companies", company)).data;

export const updateCompany = async (id, company) =>
  (await api.put(`/companies/${id}`, company)).data;

export const deleteCompany = async (id) =>
  (await api.delete(`/companies/${id}`)).data;
