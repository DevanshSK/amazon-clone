import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services/authService";
import { useAuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
    const { setLogin } = useAuthContext();

    // Login Mutation
    const loginMutation = useMutation(
        {
            mutationFn: loginService,
            onSuccess: (data) => {
                setLogin(data?.user);
                alert("User logged in successfully");
            },
            onError: (error) => {
                alert(error.response.data.message || "Something went wrong.")
                console.error("Login failed:", error.response.data);
            },
        }
    );

    const login = (email, password) => {
        loginMutation.mutate({ email, password });
    };


    return {
        login,
    };
};