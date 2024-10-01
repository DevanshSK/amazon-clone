import ComboBox from "@/components/dashboards/combobox/ComboBox";
import { Editor } from "@/components/dashboards/editor/Editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import { useDropzone } from "react-dropzone";



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
    options = [],
    setValue,
    watch,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop: (acceptedFiles) => {
            setValue(name, acceptedFiles[0], { shouldValidate: true });
        }
    });

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
        case "select": {
            const selectedValue = watch(name);
            const mappedOptions = options.map(option => ({ label: option?.name, value: option?._id }));

            return (
                <Label
                    htmlFor={`select-${label}`}
                >
                    {label && label}
                    <ComboBox
                        options={mappedOptions || []}
                        value={selectedValue}
                        onChange={(value) => setValue(name, value, { shouldValidate: true })}
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
        }
        case "textarea":{
            const selectedValue = watch(name);
            return (
                <Label
                    className='flex flex-col gap-2'
                    htmlFor={`input-${label}`}
                >
                    {label && label}
                    <Editor
                        form={form}
                        placeholder={placeholder}
                        value={selectedValue}
                        onChange={(value) => setValue(name, value, { shouldValidate: true })}
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
            );}

        case "dropzone": {
            const image = watch(name); // Using the form watch to monitor the selected file
            const imageUrl = image ? URL.createObjectURL(image) : "";

            return (
                <Label className='flex flex-col gap-2'>
                    {label && label}
                    <div {...getRootProps()} className="relative flex flex-col items-center justify-center h-60 bg-slate-200 p-2 rounded-md border-dashed border-2 border-gray-500">
                        {imageUrl && <img src={imageUrl} alt="Uploaded Image" className="object-cover absolute w-full h-full rounded-md" />}
                        <input {...getInputProps()} />
                        <p className="text-sm text-blue-700 font-semibold">Drag and drop or click to select an image</p><br />
                        <p className="text-xs text-muted-foreground">Image (5MB max)</p>
                    </div>
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
        }

        default: return <></>

    }
}

export default FormGenerator;