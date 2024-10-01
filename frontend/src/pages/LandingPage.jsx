import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronRight, Menu, X, LogIn, Package, Truck, Headphones } from "lucide-react"
import { useState } from "react"
import UserButton from "@/components/user-button/UserButton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function LandingPage() {
    const navigate = useNavigate();

    const productCategories = [
        "Electronics",
        "Clothing",
        "Home & Kitchen",
        "Books",
        "Beauty",
        "Toys & Games",
        "Sports & Outdoors",
        "Fashion",
    ]

    const getRandomHue = () => Math.floor(Math.random() * 360)

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full px-4 lg:px-6 h-16 flex items-center bg-gray-900">

                <Link to="/">
                    <img
                        src="/images/amazon-dark.png"
                        alt="LOGO"
                        className='w-[130px]'
                    />
                </Link>
                <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900]" href="#">
                        Shop
                    </Link>
                    <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900]" href="#">
                        Categories
                    </Link>
                    <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900]" href="#">
                        Deals
                    </Link>
                    <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900]" href="#">
                        Customer Service
                    </Link>
                </nav>
                <UserButton btnClass="hidden md:flex ml-4 bg-[#ff9900] text-white hover:bg-[#e68a00]" />
                {/* <button className="ml-auto md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button> */}

                <Sheet>
                    <SheetTrigger className="ml-auto md:hidden text-white pr-4 hover:opacity-75 transition">
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 text-white bg-gray-900">
                        <nav className="flex flex-col items-center py-4 bg-gray-900 md:hidden">
                            <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900] py-2" href="#">
                                Shop
                            </Link>
                            <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900] py-2" href="#">
                                Categories
                            </Link>
                            <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900] py-2" href="#">
                                Deals
                            </Link>
                            <Link className="text-sm font-medium text-gray-200 hover:text-[#ff9900] py-2" href="#">
                                Customer Service
                            </Link>
                            <UserButton btnClass="mt-4 bg-[#ff9900] text-white hover:bg-[#e68a00]" />
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
            
            <main className="flex-1">
                <section className="w-full py-24 md:py-32 lg:py-40 xl:py-56 bg-gray-900">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2 max-w-3xl">
                                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Welcome to <span className="text-[#ff9900]">Amazon</span>
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-2xl">
                                    Discover amazing products at unbeatable prices. Shop now and enjoy fast, free shipping on millions of items.
                                </p>
                            </div>
                            <Button onClick={() => navigate("/products")} className="bg-[#ff9900] text-white hover:bg-[#e68a00]" size="lg">
                                Explore All Products
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-10 px-10 md:gap-16 md:grid-cols-2">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Amazon</h2>
                                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Amazon is your one-stop destination for all your shopping needs. We offer a wide range of products
                                    across various categories, ensuring that you find exactly what you&apos;re looking for.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold tracking-tighter">Our Mission</h3>
                                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    We strive to provide our customers with the best online shopping experience, offering quality products,
                                    competitive prices, and exceptional customer service. Our goal is to make your shopping journey
                                    seamless and enjoyable.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8 text-gray-900">
                            Shop by Category
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {productCategories.map((category, index) => {
                                const hue = getRandomHue()
                                return (
                                    <Link
                                        key={index}
                                        className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                        href="#"
                                        style={{
                                            backgroundColor: `hsl(${hue}, 70%, 90%)`,
                                            transition: 'background-color 0.3s ease',
                                        }}
                                    >
                                        <div className="p-6 flex items-center justify-center h-40 relative z-10">
                                            <h3 className="text-lg font-semibold text-gray-900 text-center transition-colors duration-300">
                                                {category}
                                            </h3>
                                        </div>
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                backgroundColor: `hsl(${hue}, 70%, 85%)`,
                                            }}
                                        />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8 text-gray-900">
                            Why Choose Amazon?
                        </h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <Package className="h-12 w-12 text-[#ff9900] mb-4" />
                                <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                                <p className="text-gray-500">
                                    Browse through millions of products across various categories to find exactly what you need.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Truck className="h-12 w-12 text-[#ff9900] mb-4" />
                                <h3 className="text-xl font-bold mb-2">Fast & Free Shipping</h3>
                                <p className="text-gray-500">
                                    Enjoy quick and free delivery on eligible items, right to your doorstep.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Headphones className="h-12 w-12 text-[#ff9900] mb-4" />
                                <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
                                <p className="text-gray-500">
                                    Our dedicated team is always ready to assist you with any questions or concerns.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full py-6 bg-gray-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-gray-400">© 2024 Amazon Inc. All rights reserved.</p>
                        <nav className="flex gap-4 sm:gap-6">
                            <Link className="text-xs text-gray-400 hover:underline underline-offset-4" href="#">
                                Terms of Service
                            </Link>
                            <Link className="text-xs text-gray-400 hover:underline underline-offset-4" href="#">
                                Privacy
                            </Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}