import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "../controllers/category.controller.js";
import {
    categoryRequestBodyValidator,
} from "../validators/category.validator.js";
import { validate } from "../validators/validate.js";
import {
    verifyPermission,
    verifyJWT,
} from "../middleware/auth.middleware.js";
import { UserRolesEnum } from "../constants.js";
import { mongoIdPathVariableValidator } from "../validators/mongo.validator.js";

const router = Router();

// Create and get all categories
router
    .route("/")
    .post(
        verifyJWT,
        verifyPermission([UserRolesEnum.ADMIN]),
        categoryRequestBodyValidator(),
        validate,
        createCategory
    )
    .get(getAllCategories);

// Get single category and update and delete it.
router
    .route("/:categoryId")
    .get(mongoIdPathVariableValidator("categoryId"), validate, getCategoryById)
    .delete(
        verifyJWT,
        verifyPermission([UserRolesEnum.ADMIN]),
        mongoIdPathVariableValidator("categoryId"),
        validate,
        deleteCategory
    )
    .patch(
        verifyJWT,
        verifyPermission([UserRolesEnum.ADMIN]),
        categoryRequestBodyValidator(),
        mongoIdPathVariableValidator("categoryId"),
        validate,
        updateCategory
    );

export default router;