import { Menu } from "lucide-react"
import Sidebar from "../sidebar/Sidebar"
import {
	Sheet,
	SheetContent,
	SheetTrigger
} from "@/components/ui/sheet";
import NavItems from "./NavItems";

const Navbar = () => {
	return (
		<div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
			<Sheet>
				<SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
					<Menu />
				</SheetTrigger>
				<SheetContent side="left" className="p-0 bg-cream">
					<Sidebar />
				</SheetContent>
			</Sheet>

			<NavItems />
		</div>
	)
}

export default Navbar