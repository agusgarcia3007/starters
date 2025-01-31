import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state
      deleteCookie("token");

      // Redirect to login
      redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default http;
