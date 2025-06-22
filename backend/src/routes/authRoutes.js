import express from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Signup route
router.post(
    '/signup',
    [
        body('firstName').isLength({ min: 3 }).withMessage('Firstname must be at least 2 characters'),
        body('lastName').notEmpty().withMessage('Lastname is required'),
        body('username').notEmpty().withMessage('Username is required'),
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    authController.signup
);

// Signin route
router.post(
    '/signin',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    authController.signin
);

// Signout route
router.get('/signout', authMiddleware, authController.signout);

const authRouter = router;
export default authRouter;