const express = require('express');
const router = express.Router();
// Yahan 'login' ko bhi add karna zaroori hai
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login); // Ab 'login' define ho jayega

module.exports = router;