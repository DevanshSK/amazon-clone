import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, ImagePlus, Pencil } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    mainImage: z
        .instanceof(File)
        .describe("Upload Product image")
        .refine(
            (file) => file.size <= 5 * 1024 * 1024, // 5 MB limit
            {
                message: 'Image file size must be less than 5 MB',
                path: ['image'],
            }
        ),
})

const ImageForm = ({ initialData, productId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateProduct, isLoading } = useUpdateProduct();

    const toggleEdit = () => setIsEditing((current) => !current);

    const methods = useForm({
        resolver: zodResolver(formSchema),
    })

    const onHandleSubmit = methods.handleSubmit((values) => {
        updateProduct(values, productId);
        setIsEditing(false);
    });

    const { isSubmitting, isValid, errors } = methods.formState;

    // Initialize react dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop: (acceptedFiles) => {
            methods.setValue('mainImage', acceptedFiles[0], {
                shouldValidate: true
            });
        }
    });

    const image = methods.watch('mainImage');
    const imageUrl = image ? URL.createObjectURL(image) : "";
    console.log(isValid, errors)

    return (
        <div className="mt-6 border bg-cream rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Product Image
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Image
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.mainImage ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <img
                            alt="Product Image"
                            className="object-cover absolute w-full h-full rounded-md"
                            src={initialData?.mainImage?.url}
                        />
                    </div>
                )
            )}

            {isEditing && (
                <FormProvider {...methods}>
                    <form onSubmit={onHandleSubmit} className="space-y-4 mt-4">
                        <Loader loading={isLoading}>
                            <FormField control={methods.control} name="image" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative flex items-center justify-center h-60  bg-slate-200 p-2 rounded-md border-dashed border-2 border-gray-500" {...getRootProps()}>
                                            {imageUrl && <img
                                                alt="Selected image"
                                                className="object-cover absolute w-full h-full rounded-md"
                                                src={imageUrl}
                                            />}
                                            <input {...getInputProps()} />
                                            <div className="flex flex-col items-center justify-center">
                                                <ImagePlus className="h-10 w-10 text-slate-500" />
                                                <p className="text-sm text-blue-700 font-semibold">Choose files or drag and drop</p>
                                                <p className="text-xs text-muted-foreground">Image (5MB)</p>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended.</FormDescription>
                                    {image && <FormLabel>{image.name} - {image.size} bytes</FormLabel>}
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="flex items-center gap-x-2">
                                <Button type="submit" disabled={!isValid || isSubmitting}>
                                    Save
                                </Button>
                                <Button type="button" variant='ghost' onClick={() => methods.reset()}>Reset</Button>
                            </div>
                        </Loader>
                    </form>
                </FormProvider>
            )}
        </div>
    )
}

export default ImageForm