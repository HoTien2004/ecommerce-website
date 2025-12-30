import type { Request, Response } from "express";
import productModel from "../models/productModel.js";

// Get all products (with pagination and search)
const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string || "";
        const category = req.query.category as string || "";

        // Build query
        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }
        if (category) {
            query.category = category;
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get products and total count
        const [products, total] = await Promise.all([
            productModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
            productModel.countDocuments(query)
        ]);

        return res.status(200).json({
            success: true,
            message: "Lấy danh sách sản phẩm thành công",
            data: {
                products,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        console.error("Get all products error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

// Get product by ID
const getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const product = await (productModel as any).findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lấy thông tin sản phẩm thành công",
            data: {
                product
            }
        });

    } catch (error) {
        console.error("Get product by ID error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

// Create product
const createProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, description, price, category, stock } = req.body;
        const file = (req as any).file;

        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin (tên và giá)"
            });
        }

        // Validate price
        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: "Giá sản phẩm phải lớn hơn hoặc bằng 0"
            });
        }

        // Validate stock
        if (stock !== undefined && stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Số lượng tồn kho phải lớn hơn hoặc bằng 0"
            });
        }

        // Get image URL - from uploaded file or from body (if URL provided)
        let imageUrl = "";
        if (file) {
            // File uploaded - use the saved file path
            imageUrl = `/uploads/${file.filename}`;
        } else if (req.body.image) {
            // URL provided in body
            imageUrl = req.body.image;
        }

        // Create new product
        const newProduct = new productModel({
            name,
            description: description || "",
            price,
            image: imageUrl,
            category: category || "",
            stock: stock || 0
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Tạo sản phẩm thành công",
            data: {
                product: savedProduct
            }
        });

    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

// Update product
const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;
        const file = (req as any).file;

        const product = await (productModel as any).findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm"
            });
        }

        // Validate price if provided
        if (price !== undefined && price < 0) {
            return res.status(400).json({
                success: false,
                message: "Giá sản phẩm phải lớn hơn hoặc bằng 0"
            });
        }

        // Validate stock if provided
        if (stock !== undefined && stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Số lượng tồn kho phải lớn hơn hoặc bằng 0"
            });
        }

        // Update fields (only update if provided)
        if (name) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (category !== undefined) product.category = category;
        if (stock !== undefined) product.stock = stock;

        // Handle image update
        if (file) {
            // New file uploaded - use the saved file path
            product.image = `/uploads/${file.filename}`;
        } else if (req.body.image !== undefined) {
            // URL provided in body (or empty string to remove image)
            product.image = req.body.image;
        }

        product.updatedAt = new Date();
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Cập nhật sản phẩm thành công",
            data: {
                product
            }
        });

    } catch (error) {
        console.error("Update product error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

// Delete product
const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const product = await (productModel as any).findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm"
            });
        }

        await (productModel as any).findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Xóa sản phẩm thành công"
        });

    } catch (error) {
        console.error("Delete product error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };

