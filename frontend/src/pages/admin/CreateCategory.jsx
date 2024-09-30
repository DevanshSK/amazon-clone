import CreateCategoryForm from '@/components/forms/category/CreateCategoryForm'
import CreateCategroyFormProvider from '@/components/forms/category/CreateCategroyFormProvider'
import { Button } from '@/components/ui/button'

const CreateCategory = () => {
  return (
		<div className='flex-1 py-8 px-4 md:px-16 w-full'>
        <div className="flex flex-col h-full gap-3">
            <CreateCategroyFormProvider>
                <div className="flex flex-col gap-3">
                    <CreateCategoryForm />
                    <div className="w-full flex flex-col gap-3 items-center">
                        <Button className="w-full" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </CreateCategroyFormProvider>

        </div>
    </div>
	)
}

export default CreateCategory