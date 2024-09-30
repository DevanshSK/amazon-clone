import axios from 'axios';
// import { refreshToken } from './authService';
import { useAuthContext } from '@/contexts/AuthContext';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});


// Handle token expiration and refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired and we have not retried yet.
//     if (error.response.status === 401 && !error?.config?.url?.includes("login") && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Call the refresh token api.
//         const  {accessToken} = await axiosInstance.post("/users/refresh-token");
//         // const { accessToken } = data;

//         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

//         // Implementation 1
//         // // Retry the request with new access token.
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// )

export default axiosInstance;