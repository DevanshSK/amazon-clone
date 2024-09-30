import { CREATE_PRODUCT_FORM } from '@/constants/forms';
import { useFormContext } from 'react-hook-form';
import FormGenerator from '../../form-generator';
import { useQuery } from '@tanstack/react-query';
import { getAllCategoriessService } from '@/services/categoryService';

const CreateProductForm = () => {
	const {
		register,
		formState: { errors },
		setValue,
		watch,
	} = useFormContext();

	const { data, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategoriessService,
		onError: (error) => {
			console.log("Fetching categories failed", error);
		},
	});

	if (!isLoading) {
		console.log("CATEGORIES DATA", data);
	}

	console.log(errors);

	return (
		<>
			<h2 className='text-gravel text-xl md:text-4xl font-bold'>Create Product</h2>
			<p className='text-iridium md:text-sm'>
				Please enter all details of the product.
			</p>
			{
				CREATE_PRODUCT_FORM.map((field) => {
					if(field.id === '8'){
						field.options = data || [];
					}
					return (<FormGenerator
						key={field.id}
						{...field}
						errors={errors}
						register={register}
						name={field.name}
						setValue={setValue}
						watch={watch}
					/>)
				})
			}
		</>
	)
}

export default CreateProductForm;