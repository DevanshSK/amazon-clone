import { validationResult } from "express-validator";
import { errorHandler, ApiError } from "../utils/ApiError.js";

// This is the validate middleware responsible to centralize the error checking done by the `express-validator` `ValidationChains`.
// This checks for request validation has errors.
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    // 422: Unprocessable Entity
    throw new ApiError(422, "Received data is not valid", extractedErrors);
}