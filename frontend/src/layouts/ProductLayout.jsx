import Sidebar from "@/components/products/sidebar/Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import UserButton from "@/components/user-button/UserButton"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

const ProductLayout = ({ children }) => {

    return (
        <div className="h-full">
            <div className="h-[80px] md:hidden bg-peach md:pl-56 fixed inset-y-0 w-full z-50">
                <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
                        <Link className="md:hidden" to="/">
                            <img
                                src="/images/LOGO.png"
                                alt="LOGO"
                                className='w-[130px]'
                            />
                        </Link>

                    <div className="flex gap-x-3 items-center w-full justify-end">
                        <UserButton />
                        <Sheet>
                            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                                <Menu />
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 bg-cream">
                                <Sidebar />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
            <div className="hidden bg-ghost md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-20 md:pt-0 bg-white h-full">
                {children}
            </main>
        </div>
    )
}

export default ProductLayout