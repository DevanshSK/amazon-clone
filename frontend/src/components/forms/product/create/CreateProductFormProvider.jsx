import { Loader } from '@/components/loader';
import useCreateProductForm from '@/hooks/product/useCreateProductForm'
import { FormProvider } from 'react-hook-form';

const CreateProductFormProvider = ({children}) => {
    const { isLoading, onHandleSubmit, methods } = useCreateProductForm();

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

export default CreateProductFormProvider