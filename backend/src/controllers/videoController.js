import videoModel from '../models/videoModel.js';

// Upload a new video (Protected)
export const uploadVideo = async (req, res) => {
    try {
        const { title, description, videoUrl, thumbnailUrl, tags, videoType } = req.body;
        const userId = req.user._id;
        const video = await videoModel.create({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            tags,
            videoType,
            user: userId,
        });
        res.status(201).json({ message: 'Video uploaded successfully', video });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload video', error: error.message });
    }
};

// Get all videos with pagination
export const getAllVideos = async (req, res) => {
    try {
        // Parse pagination parameters from query string
        const page = parseInt(req.query.page) || 1; // default to page 1
        const limit = parseInt(req.query.limit) || 12; // default to 12 videos per page
        const skip = (page - 1) * limit;

        // Fetch paginated videos
        const videos = await videoModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination info
        const totalVideos = await videoModel.countDocuments();
        const totalPages = Math.ceil(totalVideos / limit);

        res.status(200).json({
            videos,
            page,
            totalPages,
            totalVideos
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
    }
};

// Get video by ID
export const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await videoModel.findById(id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch video', error: error.message });
    }
};

// Get all videos uploaded by a specific user
export const getUserVideos = async (req, res) => {
    try {
        const { userId } = req.params;
        const videos = await videoModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate('user', 'channelName username createdAt');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user videos', error: error.message });
    }
};
