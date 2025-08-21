import { api } from "./client";
export const fetchCompanies = async () =>
  (await api.get("/companies/public")).data;
export const createCompany = async (payload) =>
  (await api.post("/companies", payload)).data;
