import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
    youtube_url: { type: String, required: true },
    youtube_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, default: 0 },
    transcript_text: { type: String, default: null },
    thumbnail_url: { type: String, default: null },
    order_index: { type: Number, default: 0 },
    is_coding: { type: Boolean, default: false },
    language: { type: String, default: null }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('Video', videoSchema);
