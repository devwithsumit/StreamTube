// ✅ Always load dotenv FIRST
import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import chalk from 'chalk';
import authRouter from './src/routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

//connect to database
import { connectDB } from './src/connection/mongoConnection.js';
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send("Hello From the server");
})

app.listen(PORT, () => {
    console.log(`Server live at: ${chalk.blueBright('http://localhost:' + PORT)}`)
})