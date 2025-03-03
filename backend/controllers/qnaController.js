const { getContext, generateResponse } = require('../services/qnaService');

exports.askQuestion = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Get context from the database
    const context = await getContext();

    // Generate response
    const response = await generateResponse(query, context);

    res.json({ response });
  } catch (error) {
    console.error('Error in askQuestion:', error);
    res.status(500).json({ 
      message: 'Failed to process your question',
      error: error.message 
    });
  }
}; 