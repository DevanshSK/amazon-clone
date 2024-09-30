import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCategoryService } from "@/services/categoryService";

export const CreateCategorySchema = z.object({
    name: z.string().min(1, { message: 'Category name is required' }),
});

const useCreateCategoryForm = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: zodResolver(CreateCategorySchema),
        mode: "onChange",
    });

    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: createCategoryService,
        onSuccess: () => {
            toast.success("Category created Successfully!");
            navigate("/admin/dashboard");
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong.")
            console.error("Categroy Creation Failed :", error.response.data);
        },
    });

    const onHandleSubmit = methods.handleSubmit(
        (values) => {
            mutate(values);
        }
    )

    return {
        methods,
        onHandleSubmit,
        isLoading,
    }
}

export default useCreateCategoryForm;