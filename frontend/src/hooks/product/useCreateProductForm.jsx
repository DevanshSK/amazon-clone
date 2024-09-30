import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createProductService } from "@/services/productService";
import { toast } from "react-toastify";
import FormData from "form-data";


export const CreateProductSchema = z.object({
    name: z.string().min(1, { message: 'Product name is required' }),
    seller: z.string().min(1, { message: 'Seller name is required' }),
    brand: z.string().min(1, { message: 'Brand name is required' }),
    description: z.string().min(1, { message: 'Product details are required' }),
    price: z
        .string()
        .min(1, { message: 'Price is required' })
        .transform((value) => parseFloat(value)) // Transform the input to a number
        .refine((value) => !isNaN(value), { message: 'Price must be a number' }) // Check if the value is a valid number
        .refine((value) => value > 0, { message: 'Price must be a positive number' }),
    mainImage: z
        .instanceof(File)
        .describe("Upload Product image")
        .refine(
            (file) => file.size <= 5 * 1024 * 1024, // 5 MB limit
            {
                message: 'Image file size must be less than 5 MB',
                path: ['image'],
            }
        ),
    category: z.string().min(1, { message: 'Category is required' }),
});

const useCreateProductForm = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: zodResolver(CreateProductSchema),
        mode: "onChange",
    });

    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: createProductService,
        onSuccess: () => {
            toast.success("Product created Successfully!");
            navigate("/admin/dashboard");
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong.")
            console.error("Create Product Failed:", error.response.data);
        },
    });

    const onHandleSubmit = methods.handleSubmit(
        (values) => {
            // console.log("SUBMIT DATA", values);
            const formData = new FormData();

            for(let key in values){
                formData.append(key, values[key]);
            }

            console.log("Form Data", formData);
            mutate(formData);
        }
    )

    return {
        methods,
        onHandleSubmit,
        isLoading,
    }
}

export default useCreateProductForm;