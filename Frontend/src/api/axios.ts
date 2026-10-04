import axios from "axios";
import { getSession } from "../lib/localStorage";

const instanceAxios = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:3000/apicaracolrace",
  withCredentials: true,
});

instanceAxios.interceptors.request.use((config) => {
  const session = getSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

export default instanceAxios;
