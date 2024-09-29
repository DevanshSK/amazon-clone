import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUserService, loginService, logoutService } from '@/services/authService';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
    const { isAuthenticated, user, logout, isLoading } = useAuthContext();
    const { login } = useAuth();

    // const login = useMutation({
    //     mutationFn: loginService,
    //     onSuccess: (data) => {
    //         // localStorage.setItem('accessToken', data.accessToken);
    //         // localStorage.setItem('refreshToken', data.refreshToken);
    //         // setIsAuthenticated(true);
    //         localStorage.setItem("isAuthenticated", true);
    //         queryClient.invalidateQueries('user');
    //         alert("User logged in" + data?.user?.email);
    //     },
    //     onError: (error) => {
    //         alert(error.response.data.message || "Something went wrong.");
    //         console.error("Login failed:", error.response.data);
    //     },
    // });

    // const logoutMutation = useMutation({
    //     mutationFn: logoutService,
    //     onSuccess: () => {
    //         // localStorage.removeItem('accessToken');
    //         // localStorage.removeItem('refreshToken');
    //         setIsAuthenticated(false); // Update the authentication state
    //         localStorage.setItem("isAuthenticated", true);
    //         queryClient.setQueryData('user', null);
    //         queryClient.invalidateQueries('user');
    //         queryClient.removeQueries('user');
    //         alert("User logged out");
    //     },
    //     onError: (error) => {
    //         console.error("Logout failed:", error);
    //     },
    //     throwOnError: (error) => {
    //         console.log("THROWN ERROR ON LOGOUT", error);
    //     }
    // });

    // const { data: currentUser, isLoading } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: getCurrentUserService,
    //     enabled: isAuthenticated, // Only fetch if authenticated
    //     // notifyOnChangeProps: ['data', 'error'],
    // });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            {isAuthenticated ? "TRUE" : "FALSE"}
            {isLoading ? (
                <div>Loading...</div>
            ) : user ? (
                <div>
                    Welcome, {user.role}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;