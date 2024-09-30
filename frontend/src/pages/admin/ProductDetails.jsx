import BrandForm from "@/components/dashboards/update-product/BrandForm";
import CategoryForm from "@/components/dashboards/update-product/CategoryForm";
import DescriptionForm from "@/components/dashboards/update-product/DescriptionForm";
import ImageForm from "@/components/dashboards/update-product/ImageForm";
import PriceForm from "@/components/dashboards/update-product/PriceForm";
import SellerForm from "@/components/dashboards/update-product/SellerForm";
import TitleForm from "@/components/dashboards/update-product/TitleForm";
import { Spinner } from "@/components/loader/Spinner";
import { getAllCategoriessService } from "@/services/categoryService";
import { getSingleProductService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { productId } = useParams();

    // Fetch product details using React Query
    const { data: product, isLoading: isProductFetching, isError, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getSingleProductService(productId),
        staleTime: 1000 * 60 * 5,
    });

    const { data: categories, isLoading: isCategoriesFetching } = useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategoriessService,
		onError: (error) => {
			console.log("Fetching categories failed", error);
		},
	});

    if (isProductFetching || isCategoriesFetching) {
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
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Product Details</h1>
                    <span>Here, You can view and update your product.</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-0">
                <div className="">

                    {/* UPDATE FORMS */}
                    <TitleForm initialData={product} productId={productId} />
                    <SellerForm initialData={product} productId={productId} />
                    <BrandForm initialData={product} productId={productId} />
                    <PriceForm initialData={product} productId={productId} />
                    <CategoryForm initialData={product} productId={productId} options={categories || []} />
                    {/* UPDATE FORMS */}

                </div>
                <div className="">
                    <DescriptionForm initialData={product} productId={productId} />
                    <ImageForm initialData={product} productId={productId} />
                    
                </div>
            </div>
        </div>
    )
}

export default ProductDetails