import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const productRouter = express.Router();

// Public routes (anyone can view)
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

// Admin only routes (require admin role)
productRouter.post("/", verifyAdmin, upload.single("image"), createProduct);
productRouter.put("/:id", verifyAdmin, upload.single("image"), updateProduct);
productRouter.delete("/:id", verifyAdmin, deleteProduct);

export default productRouter;

