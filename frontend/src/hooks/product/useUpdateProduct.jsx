import { updateProductService } from "@/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";
import FormData from "form-data";

const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: updateProductService,
        onSuccess: (data) => {
            toast.success("Product updated Successfully!");
            console.log("Product updated result", data);
            queryClient.invalidateQueries(['product', data._id])
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong.")
            console.error("Update Product Failed:", error);
        },
    })

    const updateProduct = (values, productId) => {
        console.table(values)
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        mutate({ productId, productData: values });
    }

    return {
        updateProduct,
        isLoading: isPending,
    }
}

export default useUpdateProduct;