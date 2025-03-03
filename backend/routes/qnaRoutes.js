const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qnaController');
const auth = require('../middleware/auth');

// Protected route - only authenticated users can ask questions
router.post('/ask', auth, qnaController.askQuestion);

module.exports = router; 