import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";

// Create access token
const createAccessToken = (id: string): string => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
}

// Create refresh token
const createRefreshToken = (id: string): string => {
    return jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

// Login user
const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập email và mật khẩu"
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Email không hợp lệ"
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email: email } as any);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Create tokens
        const accessToken = createAccessToken(user._id.toString());
        const refreshToken = createRefreshToken(user._id.toString());

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();

        // Return result
        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role
                },
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

const logoutUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = (req as any).userId;
        const user = await userModel.findOne({ _id: userId } as any);
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi server"
        });
    }
};

// Refresh access token
const refreshAccessToken = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token không được cung cấp"
            });
        }

        // Verify refresh token
        let decoded: any;
        try {
            decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Refresh token không hợp lệ hoặc đã hết hạn"
            });
        }

        // Find user and check if refresh token matches
        const user = await userModel.findOne({ _id: decoded.id } as any);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token không hợp lệ"
            });
        }

        // Generate new access token
        const newAccessToken = createAccessToken(user._id.toString());

        return res.status(200).json({
            success: true,
            message: "Token đã được làm mới",
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        console.error("Refresh token error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

// register user
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, email, password, confirmPassword, phone, address } = req.body;

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
            password: hashedPassword,
            phone: phone || null,
            address: address || null
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
                    email: savedUser.email,
                    phone: savedUser.phone,
                    address: savedUser.address
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

// Get user profile
const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = (req as any).userId;

        const user = await userModel.findOne({ _id: userId } as any);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lấy thông tin thành công",
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            }
        });

    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

// Update user profile
const updateUserProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = (req as any).userId;
        const { firstName, lastName, email, phone, address } = req.body;

        const user = await userModel.findOne({ _id: userId } as any);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng"
            });
        }

        // Validate email if provided
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Email không hợp lệ"
            });
        }

        // Check if email is already used by another user
        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email: email } as any);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email đã được sử dụng"
                });
            }
        }

        // Update fields (only update if provided)
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (phone !== undefined) user.phone = phone || null;
        if (address !== undefined) user.address = address || null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Cập nhật thông tin thành công",
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            }
        });

    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

// Change password
const changePassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = (req as any).userId;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Validate required fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin"
            });
        }

        // Validate password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu mới nhập lại không khớp"
            });
        }

        // Validate password strength
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu mới phải có ít nhất 8 ký tự"
            });
        }

        // Find user
        const user = await userModel.findOne({ _id: userId } as any);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng"
            });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Mật khẩu hiện tại không đúng"
            });
        }

        // Check if new password is same as current
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu mới phải khác mật khẩu hiện tại"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Đổi mật khẩu thành công"
        });

    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server, vui lòng thử lại sau"
        });
    }
}

export { loginUser, logoutUser, registerUser, refreshAccessToken, getUserProfile, updateUserProfile, changePassword };