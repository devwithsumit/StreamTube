import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

// Add a comment to a video (protected)
router.post('/:videoId', authMiddleware, commentController.addComment);

// Get all comments for a video
router.get('/all/:videoId', commentController.getComments);

// Delete a comment (protected, only by owner)
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

const commentRouter = router;
export default commentRouter;
