import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, refreshToken, logout } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";

// Login mutation
export const useLogin = () => {
    const { setAuth } = useAuth();
    const queryClient = useQueryClient();

    return useMutation(login, {
        onSuccess: (data) => {
            setAuth({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                role: data.user.role
            });

            queryClient.invalidateQueries('user');
        },
        onError: (error) => {
            console.error("Login Error:", error);
        }
    })
}

// Register Mutation
export const useRegister = () => {
    return useMutation(register, {
        onSuccess: (data) => {
            console.log("User registered successfully");
        },
        onError: (error) => {
            console.error("Registration Error:", error);
        }
    });
};

// Logout
export const useLogout = () => {
    const { setAuth } = useAuth();

    return useMutation(logout, {
        onSuccess: () => {
            setAuth({
                user: null,
                accessToken: null,
                refreshToken: null,
                role: null
            });
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });
};