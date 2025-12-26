import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";

// Create access token
const createAccessToken = (id: string): string => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "15m" });
}

// Create refresh token
const createRefreshToken = (id: string): string => {
    return jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

// login user
const loginUser = async (req: Request, res: Response): Promise<Response> => {
    // Tạm thời chỉ trả về thông báo đơn giản,
    // logic xác thực sẽ được triển khai sau.
    return res.json({ success: true, message: "login" });
}

// register user
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin"
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Email không hợp lệ"
            });
        }

        // Validate password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu nhập lại không khớp"
            });
        }

        // Validate password strength (minimum 8 characters)
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu phải có ít nhất 8 ký tự"
            });
        }

        // Validate email existence
        const existingUser = await userModel.findOne({ email: email } as any);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email đã được sử dụng"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Create tokens
        const accessToken = createAccessToken(savedUser._id.toString());
        const refreshToken = createRefreshToken(savedUser._id.toString());

        // Save refresh token to database
        savedUser.refreshToken = refreshToken;
        await savedUser.save();

        // Return result (without password)
        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            data: {
                user: {
                    id: savedUser._id,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email
                },
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

export { loginUser, registerUser };