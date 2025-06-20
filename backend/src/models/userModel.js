import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    avatar: {
        type: String, // URL
        default: "",
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedChannels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model("user", userSchema);
