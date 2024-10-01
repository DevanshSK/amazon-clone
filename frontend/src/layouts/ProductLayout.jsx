
const ProductLayout = ({ children }) => {

    return (
        <div className="h-full">
            <div className="h-[80px] bg-peach md:pl-56 fixed inset-y-0 w-full z-50">
                {/* <Navbar /> */}
                Navbar
            </div>
            <div className="hidden bg-ghost md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                {/* <Sidebar /> */}
                Sidebar
            </div>
            <main className="md:pl-56 pt-20 bg-platinum h-full">
                {children}
            </main>
        </div>
    )
}

export default ProductLayout