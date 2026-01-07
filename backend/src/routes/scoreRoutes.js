const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { calculateBurnoutScore, getUserScores } = require('../controllers/scoreController');

router.post('/calculate', authMiddleware, calculateBurnoutScore);
router.get('/history', authMiddleware, getUserScores);

module.exports = router;
