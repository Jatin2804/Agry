import Joi from 'joi';

// Joi validation schema for data access
const dataSchema = Joi.object({
  category: Joi.string().valid('grains', 'fruits', 'vegetables', 'dryfruits'),
});

// Middleware for validating data category
export function validateDataInput(req, res, next) {
  const { error } = dataSchema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
