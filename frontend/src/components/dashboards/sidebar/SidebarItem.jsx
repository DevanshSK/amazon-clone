import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";


const SidebarItem = ({ icon: Icon, label, href }) => {
	const location = useLocation();
    const navigate = useNavigate();

    // Check if the current path matches the provided href
    const isActive = (location.pathname === '/dashboard' && href === "/dashboard") ||
        location.pathname === href || location.pathname?.startsWith(`${href}/`);

    // Navigation function using React Router's navigate hook
    const onClick = () => {
        navigate(href);
    }

	return (
        <button 
            onClick={onClick}
            type="button"
            className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
                isActive && "text-orange bg-blue-200/20 hover:bg-blue-200/30 hover:text-orange"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn(
                    "text-orange",
                    isActive && 'text-orange'
                )} />
                {label}
            </div>
            <div className={cn(
                'ml-auto opacity-0 border-2 border-orange h-full transition-all',
                isActive && 'opacity-100'
            )} />
        </button>
    );
}

export default SidebarItem