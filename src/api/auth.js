import api  from "./client";

export const loginApi = async (payload) =>
  (await api.post("/auth/login", payload)).data;
export const registerAdminApi = async (payload) =>
  (await api.post("/auth/register-admin", payload)).data;
