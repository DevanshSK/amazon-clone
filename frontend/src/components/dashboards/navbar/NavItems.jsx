import { useLocation, useNavigate, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuthContext } from "@/contexts/AuthContext"
import UserButton from "@/components/user-button/UserButton"


const NavItems = () => {
    const { user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    const isAdmin = !!(user?.role === "ADMIN");

    return (
        <>
            <div className="flex gap-x-2 items-center w-full justify-end">
                <NavLink to="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className="h-4 w-r mr-2" />
                        Exit
                    </Button>
                </NavLink>

                <UserButton />
            </div>
        </>
    )
}

export default NavItems