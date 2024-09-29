import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";



const FormGenerator = ({
    errors,
    inputType,
    name,
    placeholder,
    register,
    type,
    form,
    label,
    lines,
    options,
}) => {
    switch (inputType) {
        case "input":
            return (
                <Label
                    className='flex flex-col gap-2'
                    htmlFor={`input-${label}`}
                >
                    {label && label}
                    <Input
                        id={`input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        form={form}
                        {...register(name)}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>
                                {message === "Required" ? "" : message}
                            </p>
                        )}
                    />
                </Label>
            );
        case "select": return (
            <Label
                htmlFor={`select-${label}`}
            >
                {label && label}
                <select
                    form={form}
                    id={`select-{label}`}
                    {...register(name)}
                >
                    {options?.length && options.map((option) => (
                        <option
                            value={option.value}
                            key={option.id}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => (
                        <p className='text-red-400 mt-2'>
                            {message === "Required" ? "" : message}
                        </p>
                    )}
                />
            </Label>
        );
        case "textarea":
            return (
                <Label
                    className='flex flex-col gap-2'
                    htmlFor={`input-${label}`}
                >
                    {label && label}
                    <Textarea
                        form={form}
                        id={`input-${label}`}
                        placeholder={placeholder}
                        {...register(name)}
                        rows={lines}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>
                                {message === "Required" ? "" : message}
                            </p>
                        )}
                    />
                </Label>
            )

        default: return <></>

    }
}

export default FormGenerator;