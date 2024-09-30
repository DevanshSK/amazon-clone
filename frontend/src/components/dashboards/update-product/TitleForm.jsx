import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormData from 'form-data';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Product name is required' }),
})

const TitleForm = ({ initialData, productId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateProduct, isLoading } = useUpdateProduct();

    const toggleEdit = () => setIsEditing((current) => !current);

    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || ""
        },
    })

    const onHandleSubmit = methods.handleSubmit((values) => {
        const formData = new FormData();
        console.log("FORM VALUES", values);
        formData.append("name", values.name);
        updateProduct(formData, productId);
    });

    const { isSubmitting, isValid } = methods.formState;

    return (
        <div className="mt-6 border bg-cream rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Product Name
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Title
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p>{initialData.name}</p>
            ) : (
                <FormProvider {...methods}>
                    <form onSubmit={onHandleSubmit} className="space-y-4 mt-4">
                        <Loader loading={isLoading}>
                            <FormField control={methods.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. Iphone 16 pro..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="flex items-center gap-x-2">
                                <Button type="submit" disabled={!isValid || isSubmitting}>
                                    Save
                                </Button>
                            </div>
                        </Loader>
                    </form>
                </FormProvider>
            )}
        </div>
    )
}

export default TitleForm