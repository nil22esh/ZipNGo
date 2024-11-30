import express from "express";
import dotenv from "dotenv";
import productRoutes from "./src/product/routes/product.routes.js";
import {
  errorHandlerMiddleware,
  handleUncaughtError,
} from "./middlewares/errorHandlerMiddleware.js";
import userRoutes from "./src/user/routes/user.routes.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./src/order/routes/order.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// configure routes
app.use("/api/zipngo/product", productRoutes);
app.use("/api/zipngo/user", userRoutes);
app.use("/api/zipngo/order", orderRoutes);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
