import axiosInstance from "./axiosInstance";

// Create category
export const createCategoryService = async (category) => {
    console.log("Create category service", category);
    const response = await axiosInstance.post("/categories/", category);
    return response.data?.data;
}

// Get all categories
export const getAllCategoriessService = async () => {
    const response = await axiosInstance.get("/categories/");
    return response.data?.data;
}


// Get single category
export const getSingleCategoryService = async (categoryId) => {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data?.data;
}

// // Update Categories by Id
// export const updateCategoryService = async (categoryId, categoryData) => {
//     const response = await axiosInstance.patch(`/categories/${categoryId}`, categoryData);
//     return response.data?.data;
// }

// // Delete a product
// export const deleteCategoryService = async (categoryId) => {
//     const response = await axiosInstance.delete(`/categories/${categoryId}`);
//     return response.data?.data;
// }