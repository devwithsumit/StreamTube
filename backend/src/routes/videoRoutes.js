import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as videoController from '../controllers/videoController.js';

const router = express.Router();

// Upload a new video (Protected)
router.post('/upload', authMiddleware, videoController.uploadVideo);

// Get all videos
router.get('/', videoController.getAllVideos);

// Get video by ID
router.get('/:id', videoController.getVideoById);

// Get all videos uploaded by a specific user
router.get('/user/:userId', videoController.getUserVideos);

const videoRouter = router;
export default videoRouter;
