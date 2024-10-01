import { List, ListPlus, Tags } from "lucide-react";


export const AdminRoutes = [
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
