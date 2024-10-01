import { Link } from "react-router-dom"
import SidebarItem from "./SidebarItem"


const Sidebar = ({routes}) => {
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
                {routes.map(route => (
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