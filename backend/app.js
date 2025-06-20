import express from 'express';
import chalk from 'chalk';
import { connectDB } from './src/connection/mongoConnection.js';
connectDB();


import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello From the server");
})

app.listen(PORT, () => {
    console.log(`Server live at: ${chalk.blueBright('http://localhost:' + PORT)}`)
})