const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { signup, login } = require('../controllers/auth');
const authenticateJWT = require('../middleware/auth');

router.post('/signup', upload.single('proof'), signup);
router.post('/login', login);
router.get('/dashboard', authenticateJWT, getDashboard);

module.exports = router;
