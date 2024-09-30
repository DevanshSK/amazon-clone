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

const formSchema = z.object({
    brand: z.string().min(1, { message: 'Brand name is required' }),
})

const BrandForm = ({ initialData, productId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateProduct, isLoading } = useUpdateProduct();

    const toggleEdit = () => setIsEditing((current) => !current);

    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: initialData?.brand || ""
        },
    })

    const onHandleSubmit = methods.handleSubmit((values) => {
        updateProduct(values, productId);
        setIsEditing(false);
    });

    const { isSubmitting, isValid } = methods.formState;

    return (
        <div className="mt-6 border bg-cream rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Brand Name
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Brand
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p>{initialData.brand}</p>
            ) : (
                <FormProvider {...methods}>
                    <form onSubmit={onHandleSubmit} className="space-y-4 mt-4">
                        <Loader loading={isLoading}>
                            <FormField control={methods.control} name="brand" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. Apple Inc."
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

export default BrandForm