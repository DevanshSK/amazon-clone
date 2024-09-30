import { List, ListPlus, Tags } from "lucide-react"
import { Link } from "react-router-dom"
import SidebarItem from "./SidebarItem"


const adminRoutes = [
    {
        icon: List,
        label: "All Products",
        href: "/admin/dashboard",        
    },
    {
        icon: ListPlus,
        label: "Create Product",
        href: "/admin/create-product",        
    },
    {
        icon: Tags,
        label: "New Category",
        href: "/admin/create-category",
    }
]

const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-cream shadow-sm">
            <div className="p-6">
                <Link to="/">
                    <img
                        src="/images/LOGO.png"
                        alt="LOGO"
                        className='w-[130px]'
                    />
                </Link>
            </div>

            <div className="flex flex-col w-full">
                {adminRoutes.map(route => (
                    <SidebarItem 
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar