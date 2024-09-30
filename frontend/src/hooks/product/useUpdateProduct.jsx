import { updateProductService } from "@/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";
import FormData from 'form-data';
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// const schemas = {
//     name: z.object({ name: z.string().min(1, { message: "Product Name is required", }) }),
//     seller: z.object({ seller: z.string().min(1, { message: 'Seller name is required' }), }),
//     brand: z.object({ brand: z.string().min(1, { message: 'Brand name is required' }), }),
//     description: z.object({ description: z.string().min(1, { message: 'Product details are required' }), }),
//     price: z.object({
//         price: z.string()
//             .min(1, { message: 'Price is required' })
//             .transform((value) => parseFloat(value)) // Transform the input to a number
//             .refine((value) => !isNaN(value), { message: 'Price must be a number' }) // Check if the value is a valid number
//             .refine((value) => value > 0, { message: 'Price must be a positive number' }),
//     }),
//     mainImage: z.object({
//         mainImage: z
//             .instanceof(File)
//             .describe("Upload Product image")
//             .refine(
//                 (file) => file.size <= 5 * 1024 * 1024, // 5 MB limit
//                 {
//                     message: 'Image file size must be less than 5 MB',
//                     path: ['image'],
//                 }
//             ),
//     }),
//     category: z.object({ category: z.string().min(1, { message: 'Category is required' }), }),
// }

const useUpdateProduct = () => {
    // const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: updateProductService,
        onSuccess: (data) => {
            toast.success("Product updated Successfully!");
            console.log("Product updated result", data);
            // queryClient.invalidateQueries(['product'])
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong.")
            console.error("Update Product Failed:", error);
        },
    })

    const updateProduct = (values, productId) => {
        // const formData = new FormData();
        // formData.append(name, value);
        mutate(productId, values);
    }

    return {
        updateProduct,
        isLoading: isPending,
    }
}

export default useUpdateProduct;