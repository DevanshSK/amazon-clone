import { USER_REGISTER_FORM } from "@/constants/forms";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generator";

const RegisterForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <h2 className='text-gravel text-xl md:text-4xl font-bold'>Register</h2>
            <p className='text-iridium md:text-sm'>
                Please create an account by filling this simple form.
            </p>
            {
                USER_REGISTER_FORM.map((field) => (
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

export default RegisterForm;