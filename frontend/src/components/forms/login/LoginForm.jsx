import { USER_LOGIN_FORM } from "@/constants/forms";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generator";

const LoginForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <h2 className='text-gravel text-xl md:text-4xl font-bold'>Login</h2>
            <p className='text-iridium md:text-sm'>
                Please log in with your credentials.
            </p>
            {
                USER_LOGIN_FORM.map((field) => (
                    <FormGenerator
                        key={field.id}
                        {...field}
                        errors={errors}
                        register={register}
                        name={field.name}
                    />
                ))
            }
        </>
    )
}

export default LoginForm;