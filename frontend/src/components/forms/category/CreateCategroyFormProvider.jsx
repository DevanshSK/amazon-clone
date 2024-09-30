import { Loader } from '@/components/loader';
import useCreateCategoryForm from '@/hooks/category/useCreateCategoryForm';
import { FormProvider } from 'react-hook-form';

const CreateCategroyFormProvider = ({children}) => {
    const { isLoading, onHandleSubmit, methods } = useCreateCategoryForm();

    return (
        <FormProvider {...methods}>
            <form onSubmit={onHandleSubmit} className='h-full'>
                <div className='flex flex-col justify-between gap-3 h-full'>
                    <Loader loading={isLoading}>{children}</Loader>
                </div>
            </form>
        </FormProvider>
    )
}

export default CreateCategroyFormProvider