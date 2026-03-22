const { YoutubeTranscript } = require('youtube-transcript');

const getTranscript = async (videoId) => {
  try {
    // Attempt to fetch any available transcript (including auto-generated)
    const transcript = await YoutubeTranscript.fetchTranscript(videoId).catch(async () => {
       // If default fails, try some common language codes or generic fetch
       return await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
    });
    
    if (!transcript || transcript.length === 0) {
      console.warn(`No transcript found for video ${videoId}`);
      return "";
    }
    
    return transcript.map(t => t.text).join(' ');
  } catch (error) {
    console.error('Error fetching transcript:', error);
    // Return empty string instead of throwing to allow AI to potentially use video title/context if available
    return "";
  }
};

const chunkTranscript = (text, maxWords = 1000) => {
  const words = text.split(/\s+/);
  const chunks = [];
  
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(' '));
  }
  
  return chunks;
};

module.exports = {
  getTranscript,
  chunkTranscript,
};
