import axiosInstance from "./axiosInstance";

// Create product
export const createProductService = async (productData) => {
    console.log("Create product service", productData);
    const response = await axiosInstance.post("/products/", productData);
    return response.data?.data;
}

// Get all product
export const getAllProductsService = async (page) => {
    const response = await axiosInstance.get(`/products/?page=${page.pageIndex+1}&limit=${page.pageSize}`);
    return response.data?.data;
}


// Get single product
export const getSingleProductService = async (productId) => {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data?.data;
}

// Update product by Id
export const updateProductService = async (productId, productData) => {
    const response = await axiosInstance.patch(`/products/${productId}`, productData);
    return response.data?.data;
}

// Delete a product
export const deleteProductService = async (productId) => {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data?.data;
}