import axios from "axios";
import Cookies from "js-cookie";

// Set up axios with the base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor to attach authorization token
api.interceptors.request.use((config) => {
  // Check if running in a browser environment
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
