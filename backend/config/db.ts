import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    const uri = process.env.DB;

    if (!uri) {
        throw new Error("Database connection string (process.env.DB) is not defined");
    }

    await mongoose.connect(uri);
    const dbName = mongoose.connection.db?.databaseName || "unknown";
    console.log(`✅ MongoDB connected to database: ${dbName}`);
};