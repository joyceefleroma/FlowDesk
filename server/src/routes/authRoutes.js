const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const { registerSchema, loginSchema, updateProfileSchema } = require('../validators/authValidator');

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);
router.put('/profile', protect, validate(updateProfileSchema), authController.updateProfile);
router.post('/logout', protect, authController.logout);

module.exports = router;
