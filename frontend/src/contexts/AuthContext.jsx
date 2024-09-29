import { getCurrentUserService, logoutService } from "@/services/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [auth, setAuth] = useState({
        user: null,
        isAuthenticated: !!localStorage.getItem("isAuthenticated"),
    });


    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUserService,
        enabled: !!localStorage.getItem("isAuthenticated"),
        onSuccess: (data) => {
            // localStorage.setItem("isAuthenticated", true);
            console.log("User data fetched successfully");
            setAuth({ user: data, isAuthenticated: true });
            localStorage.setItem('isAuthenticated', true);
        },
        onError: () => {
            localStorage.removeItem("isAuthenticated");
            setAuth({ user: null, isAuthenticated: false });
        },
    })

    console.log(currentUser);
    console.log(auth);

    useEffect(() => {
        if (currentUser) {
          setAuth({ user: currentUser, isAuthenticated: true });
          localStorage.setItem('isAuthenticated', true);
        }
      }, [currentUser]);

    const logoutMutation = useMutation({
        mutationFn: logoutService,
        onSuccess: () => {
            localStorage.removeItem("isAuthenticated");
            setAuth({ user: null, isAuthenticated: false });
            queryClient.setQueryData('user', null);
            queryClient.invalidateQueries('user');
            queryClient.removeQueries('user');
            alert("User logged out");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });

    const logout = () => {
        logoutMutation.mutate();
    }

    const setLogin = (data) => {
        setAuth({ user: data, isAuthenticated: true });
        localStorage.setItem('isAuthenticated', true);
        queryClient.invalidateQueries("user");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: auth.isAuthenticated, user: auth.user, logout, setLogin, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuthContext = () => useContext(AuthContext);