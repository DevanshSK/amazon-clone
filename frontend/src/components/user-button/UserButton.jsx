import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuthContext } from "@/contexts/AuthContext"

const UserButton = ({ btnClass, variant = "default" }) => {
    const { user, logout, isAuthenticated } = useAuthContext();
    const navigate = useNavigate();


    return isAuthenticated ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={`relative ${btnClass}`} variant={variant}>
                    {user?.role || "User"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user?.role || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {user?.role === "ADMIN" && <><DropdownMenuItem
                    onClick={() => navigate("/admin/dashboard")}
                    className="font-normal"
                >
                    Dashboard
                </DropdownMenuItem>

                    <DropdownMenuSeparator />
                </>}


                <DropdownMenuItem
                    onClick={() => logout()}
                >
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button className={btnClass} variant={variant} onClick={() => navigate("/login")} >Login</Button>
    );
}

export default UserButton