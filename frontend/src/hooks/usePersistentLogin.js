import { useEffect } from "react";
import { refreshToken } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export const usePersistentLogin = () => {
    const { setAuth } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const data = await refreshToken();
                setAuth({
                    user: data.user,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    role: data.user.role,
                });
                queryClient.invalidateQueries('user');  // refetch user data if needed
            } catch (error) {
                console.log("No valid refresh token found, or token expired.");
                // Optionally: log the user out here if token is invalid
            }
        };

        verifyRefreshToken();
    }, [setAuth, queryClient]);
};