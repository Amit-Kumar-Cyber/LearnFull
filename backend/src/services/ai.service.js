const generateStudyMaterials = async (transcript, videoTitle) => {
  // In a real implementation, this would call Gemini or another LLM
  // For now, we'll return a structured mock response based on the transcript presence
  
  return {
    notes: {
      content: `# Study Notes: ${videoTitle}\n\n## Overview\nThis is an AI-generated summary of the video content. The transcript indicates the following key points...\n\n### Key Concepts\n- **Concept 1**: Detailed explanation based on transcript segments.\n- **Concept 2**: Another core idea retrieved by AI.\n\n## Summary\n${transcript.substring(0, 500)}...`
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          question: `What is the main topic of "${videoTitle}"?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'Based on the introductory segments of the video.',
          type: 'mcq'
        },
        {
          id: 'q2',
          question: 'The video discusses advanced topics in the first 5 minutes.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'The video starts with basics.',
          type: 'boolean'
        }
      ]
    },
    mindMap: {
      id: 'root',
      label: videoTitle,
      children: [
        { id: 'c1', label: 'Introduction' },
        { id: 'c2', label: 'Core Concepts' },
        { id: 'c3', label: 'Practical Examples' }
      ]
    },
    cheatSheet: {
      items: [
        { term: 'Term 1', definition: 'Definition 1', example: 'Example 1' },
        { term: 'Term 2', definition: 'Definition 2', example: 'Example 2' }
      ]
    }
  };
};

module.exports = {
  generateStudyMaterials,
};
