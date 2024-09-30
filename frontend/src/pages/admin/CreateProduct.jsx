import CreateProductForm from "@/components/forms/product/create/CreateProductForm";
import CreateProductFormProvider from "@/components/forms/product/create/CreateProductFormProvider";
import { Button } from "@/components/ui/button";

const CreateProduct = () => {
	return (
		<div className='flex-1 py-8 px-4 md:px-16 w-full'>
        <div className="flex flex-col h-full gap-3">
            <CreateProductFormProvider>
                <div className="flex flex-col gap-3">
                    <CreateProductForm />
                    <div className="w-full flex flex-col gap-3 items-center">
                        <Button className="w-full" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </CreateProductFormProvider>

        </div>
    </div>
	)
}

export default CreateProduct;