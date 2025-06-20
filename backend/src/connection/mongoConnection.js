import chalk from "chalk";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(chalk.yellowBright('✅ MongoDB connected'));
    } catch (err) {
        console.error(chalk.redBright('❌ MongoDB connection failed'), err.message);
        console.log(`MONGO_URI: ` + MONGO_URI);
    }
};