import { api } from "./client";

export const createInvitation = async (payload) =>
  (await api.post("/invitations", payload)).data;

export const acceptInvitation = async (payload) =>
  (await api.post("/invitations/accept", payload)).data;
