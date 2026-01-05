import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",   // <-- change if your backend URL is different
  withCredentials: true,                  // if using cookies / auth
});

// Optional: attach token automatically if you’re using JWT
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
