import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        default: "",
    },
    views: {
        type: Number,
        default: 0,
    },
    videoType: {
        type: String,
        default: 'All'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    tags: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("video", videoSchema);
