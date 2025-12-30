import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// Public routes (anyone can view)
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

// Admin only routes (require admin role)
productRouter.post("/", verifyAdmin, createProduct);
productRouter.put("/:id", verifyAdmin, updateProduct);
productRouter.delete("/:id", verifyAdmin, deleteProduct);

export default productRouter;

