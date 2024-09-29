import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/services/authService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

export const UserRegisterSchema = z.object({
    email: z.string().email({ message: "You did not enter a valid email" }),
    password: z
        .string()
        .min(8, { message: 'Your password must be atleast 8 characters long' })
        .max(64, {
            message: 'Your password can not be longer then 64 characters long',
        }),
})

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: zodResolver(UserRegisterSchema),
        mode: 'onChange',
    });

    const {mutate, isPending: isLoading} = useMutation({
        mutationFn: registerService,
        onSuccess: (data) => {
            toast.success("User Registered Successfully!");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong.")
            console.error("Register failed:", error.response.data);
        },
    });
    
    const onHandleSubmit = methods.handleSubmit(
        (values) => {
            console.log("REGISTER DATA");
            mutate(values);
        }
    )

    return {
        methods,
        onHandleSubmit,
        isLoading,
    };
};