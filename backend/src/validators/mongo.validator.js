import { body, param } from "express-validator";

// Validates mongodb id in path variable
export const mongoIdPathVariableValidator = (idName) => {
    return [
        param(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`),
    ];
};

// Validated mongodb id in body variables.
export const mongoIdRequestBodyValidator = (idName) => {
    return [body(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`)];
};