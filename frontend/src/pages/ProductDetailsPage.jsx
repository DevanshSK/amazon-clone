import { Editor } from "@/components/dashboards/editor/Editor";
import { Preview } from "@/components/dashboards/editor/Preview";
import { Spinner } from "@/components/loader/Spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSingleProductService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";


const ProductDetailsPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);

    // Fetch product details using React Query
    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getSingleProductService(productId),
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isLoading) {
        return (
            <div className="w-full py-5 flex justify-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        console.error(error);
        return <Navigate to="/products" />
    }

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
    }).format(product.price)

    console.log("Product", product);


    return (
        <div className="p-5 w-full lg:w-[80%] max-w-5xl">
            <Button
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
            </Button>

            <img
                src={product?.mainImage?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt={product?.name}
                className="w-full sm:w-[80%] md:w-[75%] lg:w-[65%] h-auto my-5"
            />

            <h2 className='text-gravel mb-0 text-xl md:text-3xl font-bold'>{product.name}</h2>

            <p className="text-iridium font-semibold md:text-lg mb-0">{product.brand}</p>
            <p className="text-iridium font-semibold md:text-lg mb-0"><span className="font-bold">Seller: </span>{product.seller}</p>
            <p className="text-lg md:text-2xl font-bold mb-4 text-iridium">{formattedPrice}</p>
            <hr className="bg-iridium border-[2px] my-2 sm:w-[80%] md:w-[75%] lg:w-[65%]" />
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Product Description</h2>
                {/* <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                /> */}
                <Preview

                    value={product.description}
                />
            </div>

            <hr className="bg-iridium border-[2px] my-2 sm:w-[80%] md:w-[75%] lg:w-[65%]" />

            <div className="mb-6">
                <h2 className="text-xl text-iridium font-semibold mb-2">Extra Details</h2>
                <p><strong>ID:</strong> {product._id}</p>
                <p><strong>Added on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>

            <Button className="w-full md:w-[75%] lg:w-[65%] max-w-96">
                Add to Cart
            </Button>
        </div>
    )

    // return (
    //     <div className="min-h-screen max-h-screen bg-gray-100 flex items-center justify-center p-4">
    //         <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full">
    //             <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
    //                 <div className={`${isMobile ? 'w-full' : 'w-1/2'} ${isMobile ? 'h-64' : 'h-screen'} relative`}>
    //                     <img
    //                         // src={product.mainImage.url}
    //                         src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //                         alt={product.name}
    //                         className="absolute w-full h-full object-cover"
    //                     />
    //                 </div>
    //                 <div className={`${isMobile ? 'w-full' : 'w-1/2'} p-8`}>
    //                     <ScrollArea className={`${isMobile ? 'h-full' : 'h-screen'} pr-4`}>
    //                         <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
    //                         <p className="text-gray-600 mb-4">{product.brand}</p>
    //                         <p className="text-2xl font-semibold mb-6 text-[#ff9900]">₹{product.price.toLocaleString()}</p>
    //                         <div className="mb-6">
    //                             <h2 className="text-xl font-semibold mb-2">Description</h2>
    //                             <div
    //                                 className="prose max-w-none"
    //                                 dangerouslySetInnerHTML={{ __html: product.description }}
    //                             />
    //                         </div>
    //                         <div className="mb-6">
    //                             <h2 className="text-xl font-semibold mb-2">Seller</h2>
    //                             <p>{product.seller}</p>
    //                         </div>
    //                         <div className="mb-6">
    //                             <h2 className="text-xl font-semibold mb-2">Product Details</h2>
    //                             <p><strong>ID:</strong> {product._id}</p>
    //                             <p><strong>Added on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
    //                         </div>
    //                         <button className="bg-[#ff9900] text-white py-2 px-4 rounded hover:bg-[#e68a00] transition-colors w-full">
    //                             Add to Cart
    //                         </button>
    //                     </ScrollArea>
    //                 </div >
    //             </div >
    //         </div >
    //     </div >
    // )
}

export default ProductDetailsPage