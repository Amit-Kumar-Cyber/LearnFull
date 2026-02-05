import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    watch_progress: { type: Number, default: 0 },
    is_completed: { type: Boolean, default: false },
    last_watched_at: { type: Date, default: Date.now }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Compound index to ensure unique progress per user per video
userProgressSchema.index({ user_id: 1, video_id: 1 }, { unique: true });

export default mongoose.model('UserProgress', userProgressSchema);
