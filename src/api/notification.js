import api from "./client";

export const listMyNotifications = async () =>
  (await api.get("/notifications")).data;

export const markNotification = async (id, data) =>
  (await api.put(`/notifications/${id}`, data)).data;

export const deleteNotification = async (id) =>
  (await api.delete(`/notifications/${id}`)).data;
