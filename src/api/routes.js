import api from "./client";

export const bestRouteForEmployee = async (employeeId, profile, departAt) =>
  (
    await api.get(`/routes/employee/${employeeId}`, {
      params: { profile, departAt },
    })
  ).data;

export const notifyRouteForEmployee = async (employeeId, profile, departAt) =>
  (
    await api.post(`/routes/employee/${employeeId}/notify`, null, {
      params: { profile, departAt },
    })
  ).data;
