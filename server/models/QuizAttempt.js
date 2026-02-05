import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    score: { type: Number, required: true },
    total_questions: { type: Number, required: true },
    answers: { type: mongoose.Schema.Types.Mixed, required: true },
    completed_at: { type: Date, default: Date.now }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('QuizAttempt', quizAttemptSchema);
