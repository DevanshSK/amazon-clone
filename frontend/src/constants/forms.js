export const USER_LOGIN_FORM = [
    {
        id: '1',
        inputType: 'input',
        placeholder: 'Enter your email',
        name: 'email',
        type: 'email',
    },
    {
        id: '2',
        inputType: 'input',
        placeholder: 'Password',
        name: 'password',
        type: 'password',
    },
]

export const CREATE_CATEGORY_FORM = [
    {
        id: '1',
        inputType: 'input',
        placeholder: 'Enter Category name',
        label: "Category Name",
        name: 'name',
        type: 'text',
    },
]

export const USER_REGISTER_FORM = [
    {
        id: '1',
        inputType: 'input',
        placeholder: 'Enter your email',
        name: 'email',
        type: 'email',
    },
    {
        id: '2',
        inputType: 'input',
        placeholder: 'Password',
        name: 'password',
        type: 'password',
    },
]


export const CREATE_PRODUCT_FORM = [
    {
        id: '1',
        inputType: 'input',
        placeholder: 'Enter product name',
        label: "Product Name",
        name: 'name',
        type: 'text',
    },
    {
        id: '2',
        inputType: 'input',
        placeholder: 'Enter seller name',
        label: "Seller name",
        name: 'seller',
        type: 'text',
    },
    {
        id: '3',
        inputType: 'input',
        placeholder: 'Enter brand name',
        label: "Brand Name",
        name: 'brand',
        type: 'text',
    },
    {
        id: '4',
        inputType: 'textarea',
        placeholder: 'Enter product details',
        label: "Product Description",
        name: 'description',
        type: 'text',
    },
    {
        id: '5',
        inputType: 'input',
        placeholder: 'Enter product price',
        label: "Product Price in Rs.",
        name: 'price',
        type: 'number',
    },
    {
        id: '6',
        inputType: 'dropzone',
        placeholder: 'Upload product image',
        label: "Product Image",
        name: 'mainImage',
        type: 'file',
    },
    {
        id: '8',
        inputType: 'select', // New category select field
        placeholder: 'Select product category',
        label: "Category",
        name: 'category',
        type: 'select',
        options: [] // Options will be passed later in the form implementation
    },
]