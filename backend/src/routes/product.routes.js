import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    updateProduct,
} from "../controllers/product.controller.js";
import {
    verifyJWT,
    verifyPermission,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { UserRolesEnum } from "../constants.js";
import {
    createProductValidator,
    updateProductValidator,
} from "../validators/product.validator.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/mongo.validator.js";

const router = Router();

// Create and get all products
router
    .route("/")
    .get(getAllProducts)
    .post(
        verifyJWT,
        verifyPermission([UserRolesEnum.ADMIN]),
        upload.fields([
            {
                name: "mainImage",
                maxCount: 1,
            },
        ]),
        createProductValidator(),
        validate,
        createProduct
    );


// Fetch, update and delete a single product by productId
router
    .route("/:productId")
    .get(mongoIdPathVariableValidator("productId"), validate, getProductById)
    .patch(
        verifyJWT,
        verifyPermission([UserRolesEnum.ADMIN]),
        upload.fields([
            {
                name: "mainImage",
                maxCount: 1,
            }
        ]),
        mongoIdPathVariableValidator("productId"),
        updateProductValidator(),
        validate,
        updateProduct
    )
    .delete(
        verifyJWT,
        verifyPermission([UserRolesEnum.ADMIN]),
        mongoIdPathVariableValidator("productId"),
        validate,
        deleteProduct
    );

// Get products by category.
router
    .route("/category/:categoryId")
    .get(
        mongoIdPathVariableValidator("categoryId"), 
        validate, 
        getProductsByCategory
    );


export default router;