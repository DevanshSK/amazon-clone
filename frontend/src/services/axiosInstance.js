import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});


// Axios Response Interceptor for handling token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !!localStorage.getItem("isAuthenticated")) {
      originalRequest._retry = true;

      try {
        // Try to get a new access token using the refresh token
        await axiosInstance.post("/users/refresh-token");
        console.log("REFRESHING TOKEN", originalRequest);
        // // Retry the original request with new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (refreshError.response?.status === 403) {
          // Redirect to login if refresh token is expired
          console.log("REFRESH TOKEN FAILED", refreshError.response);
          localStorage.removeItem("isAuthenticated");
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;