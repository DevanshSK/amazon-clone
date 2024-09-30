import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
    getLocalPath,
    getMongoosePaginationOptions,
    getStaticFilePath,
    removeLocalFile
} from "../utils/helper.js";
import { Category } from "../models/category.model.js";


const getAllProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const productAggregate = Product.aggregate([{ $match: {} }]);

    const products = await Product.aggregatePaginate(
        productAggregate,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: "totalProducts",
                docs: "products",
            },
        })
    );

    return res
        .status(200)
        .json(new ApiResponse(200, products, "Products fetched successfully."));
});


const createProduct = asyncHandler(async (req, res) => {
    const { name, description, category, price, seller, brand } = req.body;

    // Check for category
    const categoryToBeAdded = await Category.findById(category);

    if (!categoryToBeAdded) {
        throw new ApiError(404, "Category does not exist");
    }

    // Check for main image.
    if (!req.files?.mainImage || !req.files?.mainImage.length) {
        throw new ApiError(400, "Main image is required");
    }

    // Prepare main image url data.
    const mainImageUrl = getStaticFilePath(
        req,
        req.files?.mainImage[0]?.filename
    );
    const mainImageLocalPath = getLocalPath(req.files?.mainImage[0]?.filename);

    const product = await Product.create({
        name,
        description,
        price,
        seller,
        brand,
        mainImage: {
            url: mainImageUrl,
            localPath: mainImageLocalPath,
        },
        category,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { name, description, category, price, seller, brand } = req.body;

    // Check if product exists 
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product does not exist");
    }

    // Update main image object
    const mainImage = req.files?.mainImage?.length
        ? {
            url: getStaticFilePath(req, req.files?.mainImage[0]?.filename),
            localPath: getLocalPath(req.files?.mainImage[0]?.filename),
        }
        : product.mainImage;

    // Update the product in db
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                name,
                description,
                price,
                brand,
                category,
                seller,
                mainImage,
            },
        },
        {
            new: true,
        }
    );

    // Delete previous main image if we updated it.
    if (product.mainImage.url !== mainImage.url) {
        // If user is uploading new main image remove the previous one because we don't need that anymore
        removeLocalFile(product.mainImage.localPath);
    }

    // Return the updated product.
    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product updated successfully."));
});

const getProductById = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    // Check for product.
    if (!product) {
        throw new ApiError(404, "Product does not exist");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product fetched successfully"));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const category = await Category.findById(categoryId).select("name _id");

    if (!category) {
        throw new ApiError(404, "Category does not exist");
    }

    const productAggregate = Product.aggregate([
        {
            $match: {
                category: new mongoose.Types.ObjectId(categoryId),
            },
        },
    ]);

    const products = await Product.aggregatePaginate(
        productAggregate,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: "totalProducts",
                docs: "products",
            },
        })
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { ...products, category },
                "Category products fetched successfully"
            )
        );
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({
        _id: productId,
    });

    if (!product) {
        throw new ApiError(404, "Product does not exist");
    }

    // Remove product images
    const productImages = [product.mainImage];
    productImages.map((image) => {
        removeLocalFile(image.localPath);
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { deletedProduct: product },
                "Product deleted successfully"
            )
        );

});

export {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    updateProduct,
};