import { body } from "express-validator";
import { mongoIdRequestBodyValidator } from "./mongo.validator.js";

const createProductValidator = () => {
    return [
        body("name").trim().notEmpty().withMessage("Product Name is required"),
        body("brand").trim().notEmpty().withMessage("Product Brand is required"),
        body("seller").trim().notEmpty().withMessage("Seller Name is required"),
        body("description")
            .trim()
            .notEmpty()
            .withMessage("Description is required"),
        body("price")
            .trim()
            .notEmpty()
            .withMessage("Price is required")
            .isNumeric()
            .withMessage("Price must be a number"),
        ...mongoIdRequestBodyValidator("category")
    ];
};

const updateProductValidator = () => {
    return [
        body("name").optional().trim().notEmpty().withMessage("Product Name is required"),
        body("brand").optional().trim().notEmpty().withMessage("Product Brand is required"),
        body("seller").optional().trim().notEmpty().withMessage("Seller Name is required"),
        body("description")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Description is required"),
        body("price")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Price is required")
            .isNumeric()
            .withMessage("Price must be a number"),
        body("category")
            .optional()
            .trim()
            .isMongoId()
            .withMessage(`Invalid Category`),
    ];
};

export {
    createProductValidator,
    updateProductValidator,
};
