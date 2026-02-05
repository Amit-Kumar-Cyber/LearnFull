import express from 'express';
import Video from '../models/Video.js';
import UserProgress from '../models/UserProgress.js';
import AIAsset from '../models/AIAsset.js';
import QuizAttempt from '../models/QuizAttempt.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Get Video by YouTube ID
router.get('/videos/youtube/:youtubeId', async (req, res) => {
    try {
        const video = await Video.findOne({ youtube_id: req.params.youtubeId });
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        // Also get AI Assets
        const aiAssets = await AIAsset.findOne({ video_id: video._id });
        res.json({ video, aiAssets });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create/Get Video (when user pastes link)
router.post('/videos', authenticateToken, async (req, res) => {
    try {
        const { youtube_id, youtube_url, title, duration, thumbnail_url } = req.body;

        // Check if exists
        let video = await Video.findOne({ youtube_id });
        if (video) {
            const aiAssets = await AIAsset.findOne({ video_id: video._id });
            return res.json({ video, aiAssets });
        }

        // Create new
        video = new Video({
            youtube_id,
            youtube_url,
            title,
            duration,
            thumbnail_url
        });
        await video.save();

        // Trigger AI Generation (stub for now, just create empty asset)
        // In real app, this would call AI service
        const aiAsset = new AIAsset({
            video_id: video._id,
            generation_status: 'pending' // or 'completed' if we mock it immediately
        });
        await aiAsset.save();

        res.status(201).json({ video, aiAssets: aiAsset });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update AI Assets (Mock generation)
router.post('/ai-assets/generate', authenticateToken, async (req, res) => {
    try {
        const { videoId, title } = req.body;
        // Mock the AI generation logic from frontend
        // In a real backend, this would likely be an async job

        // For now, we update the asset with the mock data provided by frontend or generate it here
        // But since logic was in frontend, let's accept the assets in body or just mark as completed

        // Actually, to keep it simple and migrate the logic:
        // We'll trust the client to send the "generated" content for now OR we move the generation logic here.
        // The frontend code had `mockNotes`, `mockQuiz` etc. 
        // Let's assume the frontend sends the generated data to save it.

        const { notes_markdown, cheatsheet_json, mindmap_json, quiz_json } = req.body;

        const aiAsset = await AIAsset.findOneAndUpdate(
            { video_id: videoId },
            {
                notes_markdown,
                cheatsheet_json,
                mindmap_json,
                quiz_json,
                generation_status: 'completed',
                generated_at: new Date()
            },
            { new: true, upsert: true }
        );

        res.json(aiAsset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Progress
router.post('/progress', authenticateToken, async (req, res) => {
    try {
        const { video_id, watch_progress, is_completed } = req.body;

        const progress = await UserProgress.findOneAndUpdate(
            { user_id: req.user.id, video_id },
            {
                watch_progress,
                is_completed,
                last_watched_at: new Date()
            },
            { new: true, upsert: true }
        );
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit Quiz
router.post('/quiz/submit', authenticateToken, async (req, res) => {
    try {
        const { video_id, score, total_questions, answers } = req.body;

        const attempt = new QuizAttempt({
            user_id: req.user.id,
            video_id,
            score,
            total_questions,
            answers
        });
        await attempt.save();
        res.json(attempt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Dashboard Data
router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        // Get stats
        const progress = await UserProgress.find({ user_id: req.user.id }).populate('video_id');
        const quizzes = await QuizAttempt.find({ user_id: req.user.id });

        // Calculate stats similar to frontend logic
        const totalMinutes = progress.reduce((acc, p) => acc + (p.video_id?.duration || 0), 0);
        const hoursLearned = Math.round(totalMinutes / 3600);
        const quizzesPassed = quizzes.filter(q => q.score / q.total_questions >= 0.7).length;

        // Get Courses with progress
        // This is a bit complex in Mongo without aggregation pipeline
        // For simplicity: get all courses, then map progress
        const courses = await import('../models/Course.js').then(m => m.default.find({ is_public: true }).limit(6));

        // We need video count per course
        // And user completed video count per course
        // This requires more queries or aggregation

        const coursesData = await Promise.all(courses.map(async (course) => {
            const videos = await Video.find({ course_id: course._id });
            const videoIds = videos.map(v => v._id);
            const completedCount = await UserProgress.countDocuments({
                user_id: req.user.id,
                video_id: { $in: videoIds },
                is_completed: true
            });

            return {
                ...course.toObject(),
                total_videos: videos.length,
                completed_videos: completedCount
            };
        }));

        res.json({
            stats: {
                hoursLearned,
                quizzesPassed,
                currentStreak: 7, // Mock streak for now
                completionRate: 0 // Calculate if needed
            },
            courses: coursesData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
