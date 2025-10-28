const qaPrompt = (text) => {
  return `
    You are an expert tutor. Create 8-15 study questions with clear, concise answers based on the text below.
    
    IMPORTANT: Return ONLY a valid JSON array in this exact format, no other text:
    
    [
      {
        "question": "What is the main topic discussed?",
        "answer": "The main topic is..."
      },
      {
        "question": "What are the key points mentioned?",
        "answer": "The key points include..."
      }
    ]
    
    Text content:
    ${text.substring(0, 4000)}  // Limit text length
    `;
};

const mindMapPrompt = (text) => {
  return `
    Analyze the following text and create a hierarchical mind map structure in valid JSON format.
    
    Return ONLY JSON in this exact structure, no other text:
    
    {
      "title": "Main Topic",
      "children": [
        {
          "title": "Subtopic 1",
          "children": [
            {"title": "Detail 1"},
            {"title": "Detail 2"}
          ]
        },
        {
          "title": "Subtopic 2",
          "children": []
        }
      ]
    }
    
    Keep it simple with 2-4 main subtopics.
    
    Text:
    ${text.substring(0, 4000)}
    `;
};

module.exports = { qaPrompt, mindMapPrompt };
