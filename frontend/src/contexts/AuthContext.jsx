import { getCurrentUserService, logoutService } from "@/services/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

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
        refetchInterval: 1000 * 60 * 15,
        onSuccess: (data) => {
            console.log("ONSUCCESS METHOD RUN")
            if(data){
                setAuth({ user: data, isAuthenticated: true });
                localStorage.setItem('isAuthenticated', true);
            }
        },
        onError: () => {
            localStorage.removeItem("isAuthenticated");
            setAuth({ user: null, isAuthenticated: false });
        },
    })


    // useEffect(() => {
    //     if (currentUser) {
    //         setAuth({ user: currentUser, isAuthenticated: true });
    //     }
    //   }, [currentUser]);

    const logoutMutation = useMutation({
        mutationFn: logoutService,
        onSuccess: () => {
            localStorage.removeItem("isAuthenticated");
            setAuth({ user: null, isAuthenticated: false });
            queryClient.setQueryData('user', null);
            queryClient.invalidateQueries('user');
            queryClient.removeQueries('user');
            toast.success("User logged out!")
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
        <AuthContext.Provider value={{ isAuthenticated: auth.isAuthenticated, user: currentUser, logout, setLogin, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuthContext = () => useContext(AuthContext);