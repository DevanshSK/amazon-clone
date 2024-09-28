import axios from "./axiosInstance.js";

// Login
export const login = async (credentials) => {
    const response = await axios.post("/login", credentials);
    return response.data;
}

// Register
export const register = async (userData) => {
    const response = await axios.post('/register', userData);
    return response.data;  // maybe tokens or a success message
};

// Refresh Token
export const refreshToken = async () => {
    const response = await axios.get('/refresh-token');
    return response.data;  // new access token
};

// Logout
export const logout = async () => {
    await axios.post('/logout');
};