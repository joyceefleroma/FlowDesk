const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'flowdesk_jwt_super_secret_key_2026_production_grade_secure_random_key_99482',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const register = async ({ name, email, password, timezone = 'UTC' }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    const error = new Error('An account with this email address already exists.');
    error.statusCode = 400;
    error.code = 'EMAIL_ALREADY_EXISTS';
    throw error;
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    timezone
  });

  const token = generateToken(user._id);

  return {
    user: user.toSafeObject(),
    token
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const token = generateToken(user._id);

  return {
    user: user.toSafeObject(),
    token
  };
};

const updateProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  if (updateData.name) user.name = updateData.name;
  if (updateData.timezone) user.timezone = updateData.timezone;
  if (updateData.preferences) {
    user.preferences = { ...user.preferences, ...updateData.preferences };
  }

  await user.save();
  return user.toSafeObject();
};

module.exports = {
  register,
  login,
  updateProfile,
  generateToken
};
