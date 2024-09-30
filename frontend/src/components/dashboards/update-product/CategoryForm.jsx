import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import ComboBox from "../combobox/ComboBox";

const formSchema = z.object({
    category: z.string().min(1, { message: 'Category is required' }),
})

const CategoryForm = ({ initialData, productId, options }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateProduct, isLoading } = useUpdateProduct();


    const toggleEdit = () => setIsEditing((current) => !current);

    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: initialData?.category
        },
    })

    const onHandleSubmit = methods.handleSubmit((values) => {
        updateProduct(values, productId);
        setIsEditing(false);
    });

    const { isSubmitting, isValid } = methods.formState;
    const selectedValue = methods.watch("category");

    const currentCategory = options?.find(c => c._id === initialData?.category);
    const mappedOptions = options.map(option => ({ label: option?.name, value: option?._id }));

    return (
        <div className="mt-6 border bg-cream rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Category
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Category
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p>{currentCategory.name}</p>
            ) : (
                <FormProvider {...methods}>
                    <form onSubmit={onHandleSubmit} className="space-y-4 mt-4">
                        <Loader loading={isLoading}>
                            <FormField control={methods.control} name="category" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ComboBox
                                            options={mappedOptions || []}
                                            value={selectedValue}
                                            onChange={(value) => methods.setValue('category', value, { shouldValidate: true })}
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

export default CategoryForm