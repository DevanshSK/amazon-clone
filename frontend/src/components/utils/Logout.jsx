import { useAuthContext } from '@/contexts/AuthContext';

const Logout = () => {
    const { logout } = useAuthContext();

    return <button onClick={logout}>Logout</button>;
};

export default Logout;