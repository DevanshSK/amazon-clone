import { Loader } from "@/components/loader";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import { FormProvider } from "react-hook-form";

const LoginFormProvider = ({ children }) => {
    const { isLoading, onHandleSubmit, methods } = useLoginForm();

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

export default LoginFormProvider;