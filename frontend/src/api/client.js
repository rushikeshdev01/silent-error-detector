import axios from "axios";

// Single axios instance used everywhere.
// The token is read fresh from localStorage on every request
// so we don't need to re-create the instance after login.
const api = axios.create({
  baseURL: "http://localhost:8001",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sed_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
