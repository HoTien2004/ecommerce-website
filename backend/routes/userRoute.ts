import express from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, getUserProfile, updateUserProfile, changePassword } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);

// Protected routes (require authentication)
userRouter.post("/logout", verifyToken, logoutUser);
userRouter.get("/profile", verifyToken, getUserProfile);
userRouter.put("/profile", verifyToken, updateUserProfile);
userRouter.put("/password", verifyToken, changePassword);

export default userRouter;