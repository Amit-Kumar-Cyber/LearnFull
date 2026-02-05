import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail_url: { type: String, default: null },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    is_public: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('Course', courseSchema);
