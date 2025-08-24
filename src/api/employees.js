import api  from "./client";

export const fetchEmployeesByBranch = async (branchId) =>
  (await api.get(`/employees/branch/${branchId}`)).data;

export const deleteEmployee = async (id) =>
  (await api.delete(`/employees/${id}`)).data;

// OPTIONAL: if you add GET /employees/me on backend
export const fetchMyEmployee = async () =>
  (await api.get("/employees/me")).data;

// Update my own workType/homeLocation as EMPLOYEE
export const updateEmployee = async (id, payload) =>
  (await api.put(`/employees/${id}`, payload)).data;

export const inviteEmployee = async (payload) =>
  (await api.post("/employees/invite", payload)).data;