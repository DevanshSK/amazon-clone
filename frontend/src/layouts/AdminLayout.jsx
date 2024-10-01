import Navbar from '@/components/dashboards/navbar/Navbar';
import Sidebar from '@/components/dashboards/sidebar/Sidebar';
import { Spinner } from '@/components/loader/Spinner';
import { useAuthContext } from '@/contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import { AdminRoutes } from '@/constants/sidebarRoutes';

const AdminLayout = () => {
    const { user, isLoading, isAuthenticated } = useAuthContext();

    if (isLoading) {
        return (
            <div className="w-full py-5 flex justify-center">
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user && user.role !== "ADMIN") {
        return <Navigate to="/" />;
    }


    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar routes={AdminRoutes} />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar routes={AdminRoutes} />
            </div>
            <main className="md:pl-56 pt-20 h-full">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout