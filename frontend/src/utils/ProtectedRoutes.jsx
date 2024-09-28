import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
    const { auth } = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(auth.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;