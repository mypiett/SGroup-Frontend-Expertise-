import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("❌ Không có access token khi gửi request!");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        const renewResponse = await axios.post("http://localhost:3000/auth/refreshToken");
        const newAccessToken = renewResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(originalRequest);
      }catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/SGroup-Frontend-Expertise-/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
