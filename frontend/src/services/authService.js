import axiosInstance from "./axiosInstance.js";

// Login
export const loginService = async (credentials) => {
    console.log("Login service", credentials)
    const response = await axiosInstance.post("/users/login", credentials);
    console.log("Response", response.data);
    return response.data?.data;
}

// Register
export const registerService = async (credentials) => {
    const response = await axiosInstance.post('/users/register', credentials);
    return response.data?.data;  // maybe tokens or a success message
};

// Refresh Token
export const refreshTokenService = async () => {
    const response = await axiosInstance.get('/users/refresh-token');
    return response.data?.data;  // new access token
};

// Logout
export const logoutService = async () => {
    await axiosInstance.post('/users/logout');
};

// Get Current User Service
// export const getCurrentUserService = async () => {
//     const response = await axiosInstance.get('/users/current-user', {
//         withCredentials: true,
//     });
//     console.log("USER RESPONSE", response.data?.data);
//     return response.data?.data;  // Assuming the response structure contains user data
// };
export const getCurrentUserService = async () => {
    try {
        const response = await axiosInstance.get('/users/current-user', {
            withCredentials: true,
        });
        console.log("USER RESPONSE:", response.data);  // Check the full structure here
        return response.data?.data; // Ensure data contains the user info you're expecting
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Throwing the error will trigger onError in useQuery
    }
};