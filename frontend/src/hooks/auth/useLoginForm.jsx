import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services/authService";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

export const UserLoginSchema = z.object({
    email: z.string().email({ message: "You did not enter a valid email" }),
    password: z
        .string()
        .min(8, { message: 'Your password must be atleast 8 characters long' })
        .max(64, {
            message: 'Your password can not be longer then 64 characters long',
        }),
})

export const useLoginForm = () => {
    const { setLogin } = useAuthContext();
    const navigate = useNavigate();
    const methods = useForm({
        resolver: zodResolver(UserLoginSchema),
        mode: 'onChange',
    })

    // Login Mutation
    const { mutate, isPending: isLoading } = useMutation(
        {
            mutationFn: loginService,
            onSuccess: (data) => {
                setLogin(data?.user);
                console.log("USER ROLE", data?.user?.role);
                toast.success("User logged in!");

                navigate(data?.user?.role === "ADMIN" ? "/admin/dashboard" : "/")
            },
            onError: (error) => {
                toast.error(error.response.data.message || "Something went wrong.")
                console.error("Login failed:", error.response.data);
            },
        }
    );
    // mutate({ email, password });

    const onHandleSubmit = methods.handleSubmit(
        (values) => {
            mutate(values);
        }
    )


    return {
        methods,
        onHandleSubmit,
        isLoading,
    };
};