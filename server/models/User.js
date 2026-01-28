const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
    },
    // We will track progress here (simplified for now)
    progress: [
        {
            videoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video',
            },
            completed: {
                type: Boolean,
                default: false,
            },
            quizScore: {
                type: Number,
                default: 0,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
