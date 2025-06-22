import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Token not found, Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await userModel.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found, Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to decode the token', error: error.message });
    }
};

export default authMiddleware;