import { useAuthContext } from '@/contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = () => {
    const { user } = useAuthContext();

    if(!user){
        return <Navigate to="/login"  />
    }

    if(user.role !== "ADMIN"){
        return <Navigate to="/" />;
    }

    return (
        <div className='h-screen flex w-full justify-center'>
            <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
                <img
                    src="/images/LOGO.png"
                    alt="LOGO"
                    className='w-[20%] h-auto'
                />
                <Outlet />
            </div>
            <div className="hidden lg:flex flex-1 w-full max-h-full relative bg-cream flex-col">
                <img
                    src="/images/loginImage.jpg"
                    alt="background"
                    loading="lazy"
                    className="absolute w-full h-full object-cover object-left"
                />
            </div>
        </div>
    )
}

export default AdminLayout