import commentModel from '../models/commentModel.js';

// Add a comment to a video
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { videoId } = req.params;
        const userId = req.user._id;
        const comment = await commentModel.create({
            text,
            video: videoId,
            user: userId
        });
        await comment.populate('user', 'username avatar channelName firstName lastName');
        res.status(201).json({ message: 'Comment added', comment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

// Get all comments for a video
export const getComments = async (req, res) => {
    try {
        const { videoId } = req.params;
        const comments = await commentModel.find({ video: videoId })
            .sort({ createdAt: -1 })
            .populate('user', 'username avatar firstName lastName');
        res.status(200).json(comments);


        // User comments first logic
        // const { videoId } = req.params;
        // // Get all comments for the video, sorted by createdAt descending
        // const comments = await commentModel.find({ video: videoId })
        //     .sort({ createdAt: -1 })
        //     .populate('user', 'username avatar firstName lastName');

        // // If user is logged in, try to show their comments at the top
        // if (req.user && req.user._id) {
        //     const userId = req.user._id;
        //     const userComments = [];
        //     const otherComments = [];
        //     comments.forEach(comment => {
        //         if (String(comment.user._id) === String(userId)) {
        //             userComments.push(comment);
        //         } else {
        //             otherComments.push(comment);
        //         }
        //     });
        //     // If user has comments, show theirs at the top
        //     if (userComments.length > 0) {
        //         return res.status(200).json([...userComments, ...otherComments]);
        //     }
        // }
        // // If not logged in or user has no comments, return normal sorted comments
        // res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
    }
};

// Delete a comment (only by owner)
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await commentModel.findById(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        if (String(comment.user) !== String(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }
        await comment.deleteOne();
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error: error.message });
    }
};
