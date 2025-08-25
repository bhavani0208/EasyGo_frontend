import api  from "./client";

 const loginApi = async (payload) =>
  (await api.post("/auth/login", payload)).data;
 const registerAdminApi = async (payload) =>
  (await api.post("/auth/register-admin", payload)).data;

 export { loginApi, registerAdminApi };