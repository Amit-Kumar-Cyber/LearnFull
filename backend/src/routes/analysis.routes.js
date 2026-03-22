const express = require('express');
const router = express.Router();
const youtubeService = require('../services/youtube.service');
const researchService = require('../services/research.service');

router.post('/analyze', async (req, res) => {
  const { url, title } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  try {
    // Extract video ID
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    console.log(`Processing video: ${videoId}`);

    const axios = require('axios');
    let videoTitle = title || "YouTube Video";
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const response = await axios.get(oembedUrl);
      if (response.data && response.data.title) {
        videoTitle = response.data.title;
        console.log(`Fetched title: ${videoTitle}`);
      }
    } catch (e) {
      console.warn("Could not fetch video title:", e.message);
    }

    const fullUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`Fetching transcript for ${videoId}...`);
    const transcript = await youtubeService.getTranscript(videoId);
    console.log(`Transcript fetched (${transcript.length} characters)`);
    
    // 2. Perform Semantic Audit
    console.log(`Performing semantic audit on full transcript...`);
    const analysis = await researchService.performSemanticAudit(transcript, videoTitle);
    console.log(`Semantic audit complete`);

    res.json({
      videoId,
      url: fullUrl,
      title: videoTitle,
      ...analysis
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/chat', async (req, res) => {
  const { url, message, history } = req.body;

  if (!url || !message) {
    return res.status(400).json({ error: 'URL and message are required' });
  }

  try {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const transcript = await youtubeService.getTranscript(videoId);
    const response = await researchService.chatWithVideo(transcript, message, history || []);

    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
