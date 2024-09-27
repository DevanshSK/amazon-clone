import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './utils/ApiError.js';

const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN === "*" 
        ? "*"
        : process.env.CORS_ORIGIN?.split(","),
    credentials: true,
}));

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(express.static("public"));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());


// Routes import 
import userRouter from "./routes/user.routes.js";
import ProductRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/categroy.routes.js";

// Routes declaration
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Hello everyone"
    })
})

app.use("/api/users", userRouter);
app.use("/api/products", ProductRouter);
app.use("/api/categories", categoryRouter);

// Custom error handling
app.use(errorHandler);

export {app};