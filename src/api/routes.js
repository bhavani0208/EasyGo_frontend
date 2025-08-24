import api from "./client";

export const bestRouteForEmployee = async (employeeId, profile) =>
  (await api.get(`/routes/employee/${employeeId}`, { params: { profile } })).data;

export const notifyRouteForEmployee = async (employeeId, profile) =>
  (await api.post(`/routes/employee/${employeeId}/notify`, null, { params: { profile } })).data;
