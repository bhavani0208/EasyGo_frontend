import  api  from "./client";

const API_URL = "http://localhost:5000/api/companies";

export const fetchCompanies = async () => (await api.get("/companies")).data;
export async function createCompany(company) {
  const res = await axios.post(API_URL, company);
  return res.data;
}

export async function updateCompany(id, company) {
  const res = await axios.put(`${API_URL}/${id}`, company);
  return res.data;
}

export async function deleteCompany(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}
