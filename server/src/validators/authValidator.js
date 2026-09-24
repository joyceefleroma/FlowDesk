const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name cannot exceed 60 characters'),
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  timezone: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required')
});

const updateProfileSchema = z.object({
  name: z.string().min(2).max(60).optional(),
  timezone: z.string().optional(),
  preferences: z.object({
    theme: z.enum(['dark', 'light', 'system']).optional(),
    inAppNotifications: z.boolean().optional(),
    upcomingDeadlineThresholdHours: z.number().min(1).max(168).optional()
  }).optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema
};
