import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})