const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTranscript } = require('../services/youtubeService');
const { generateNotes, generateQuiz } = require('../services/aiService');

// @route   POST api/content/generate
// @desc    Generate Content (Notes, Quiz) from YouTube URL
// @access  Private
router.post('/generate', auth, async (req, res) => {
    const { videoId } = req.body;
    // Expecting ID like "Get7rqXYwKc" (not full URL for simplicity in this MVP step)

    if (!videoId) {
        return res.status(400).json({ msg: 'Video ID is required' });
    }

    try {
        // 1. Fetch Transcript
        const transcript = await getTranscript(videoId);

        // 2. Generate AI Content (Parallel for speed)
        const [notes, quiz] = await Promise.all([
            generateNotes(transcript),
            // generateQuiz(transcript) // Commented out to save tokens/complexity for first run
        ]);

        // 3. Return Data (In real app, save to DB here)
        res.json({
            videoId,
            notes,
            // quiz
            msg: "Content generated successfully"
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

module.exports = router;
