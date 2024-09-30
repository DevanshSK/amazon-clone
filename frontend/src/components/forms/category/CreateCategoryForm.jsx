import { CREATE_CATEGORY_FORM } from "@/constants/forms";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generator";



const CreateCategoryForm = () => {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();


    return (
        <>
            <h2 className='text-gravel text-xl md:text-4xl font-bold'>Create Category</h2>
            <p className='text-iridium md:text-sm'>
                Categories names must be unique.
            </p>
            {
                CREATE_CATEGORY_FORM.map((field) => (
                    <FormGenerator
                        key={field.id}
                        {...field}
                        errors={errors}
                        register={register}
                        name={field.name}
                        setValue={setValue}
                        watch={watch}
                    />
                ))
            }
        </>
    )
}

export default CreateCategoryForm