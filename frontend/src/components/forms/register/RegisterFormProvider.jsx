import { Loader } from "@/components/loader";
import { useRegisterForm } from "@/hooks/auth/useRegisterForm";
import { FormProvider } from "react-hook-form";

const RegisterFormProvider = ({ children }) => {
    const { isLoading, onHandleSubmit, methods } = useRegisterForm();

    return (
        <FormProvider {...methods}>
            <form onSubmit={onHandleSubmit} className="h-full">
                <div className="flex flex-col justify-between gap-3 h-full">
                    <Loader loading={isLoading}>{children}</Loader>
                </div>
            </form>
        </FormProvider>
    )
}

export default RegisterFormProvider;