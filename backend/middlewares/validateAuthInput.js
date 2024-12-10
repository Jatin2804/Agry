import Joi from 'joi';

// Joi validation schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).required(), // Username must be at least 3 characters long
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Joi validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Middleware to validate registration data
export function validateRegisterInput(req, res, next) {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

// Middleware to validate login data
export function validateLoginInput(req, res, next) {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
