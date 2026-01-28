const { YoutubeTranscript } = require('youtube-transcript');

const getTranscript = async (videoId) => {
    try {
        const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
        // Combine into a single string
        const fullText = transcriptItems.map(item => item.text).join(' ');
        // Limit length to avoid token limits (rudimentary truncation)
        return fullText.substring(0, 15000);
    } catch (error) {
        console.error('Error fetching transcript:', error.message);
        throw new Error('Failed to fetch transcript. Video might not have captions.');
    }
};

module.exports = { getTranscript };
