import { Spinner } from "@/components/loader/Spinner";
import { getSingleProductService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { productId } = useParams();

    // Fetch product details using React Query
    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getSingleProductService(productId),
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return (
            <div className="w-full py-5 flex justify-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        console.error(error);
        return <Navigate to="/admin/dashboard" />
    }

    console.log("Product", product);

    return (
        <div>ProductDetails</div>
    )
}

export default ProductDetails