import { useAuthContext } from '@/contexts/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
    const { user } = useAuthContext();

    if( user ) return <Navigate to="/"/>

    return (
        <div>
            <h1>Auth pages</h1>
            <Outlet />
        </div>
    )
}

export default AuthLayout