import mongoose from 'mongoose';

const aiAssetSchema = new mongoose.Schema({
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    notes_markdown: { type: String, default: null },
    cheatsheet_json: { type: mongoose.Schema.Types.Mixed, default: {} },
    mindmap_json: { type: mongoose.Schema.Types.Mixed, default: {} },
    quiz_json: { type: mongoose.Schema.Types.Mixed, default: [] },
    generation_status: {
        type: String,
        enum: ['pending', 'generating', 'completed', 'failed'],
        default: 'pending'
    },
    generated_at: { type: Date, default: null }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('AIAsset', aiAssetSchema);
