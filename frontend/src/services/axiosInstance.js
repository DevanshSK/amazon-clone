import axios from 'axios';
import { refreshToken } from './authService';
import { useAuth } from '@/contexts/AuthContext';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

// Add access token to request handlers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Handle token expiration and refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired and we have not retried yet.
    if (error.response.status === 401 && !error?.config?.url?.includes("login") && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call the refresh token api.
        const { data } = await axiosInstance.post("/users/refresh-token");
        const { accessToken } = data;

        const { setAuth } = useAuth();
        setAuth((prev) => ({ ...prev, accessToken: accessToken }));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Implementation 1
        // localStorage.setItem('accessToken', accessToken);
        // // Retry the request with new access token.
        // originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // // If refresh token fails, log the user out.
        // localStorage.removeItem('accessToken');
        // window.location.href = "/login";
        // return Promise.reject(refreshError)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
)

export default axiosInstance;