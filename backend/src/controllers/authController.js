import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { validationResult } from 'express-validator';
import { createToken } from '../utils/jwtToken.js';

// Signup Controller
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await userModel.create({
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });

        //Genrate Token
        const token = createToken(user._id);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                firstName,
                lastName,
                username,
                email
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Signin Controller
export const signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        // Find user
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = createToken(user._id);

        // Set cookie (optional, for httpOnly cookie auth)
        res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });

        res.status(200).json({
            message: 'Signin successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Signout Controller
export const signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signout successful' });
};