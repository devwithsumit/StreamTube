// ✅ Always load dotenv FIRST
import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';


import authRouter from './src/routes/authRoutes.js';
import videoRouter from './src/routes/videoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

//connect to database
import { connectDB } from './src/connection/mongoConnection.js';
import commentRouter from './src/routes/commentRoutes.js';
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/videos', videoRouter);
app.use('/api/comments', commentRouter);

app.get(['/', '/api', '/api/auth'], (req, res) => {
    res.send("Hello From the server");
})

app.listen(PORT, () => {
    console.log(`Server live at: ${chalk.blueBright('http://localhost:' + PORT)}`)
})