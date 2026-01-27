const Joi = require('joi');

const studentSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  studentId: Joi.string().min(3).max(20).required(),
  major: Joi.string().min(2).max(50).required(),
  enrollmentYear: Joi.number().integer().min(2000).max(2100).required(),
  isActive: Joi.boolean().required()
});

const studentIdSchema = Joi.object({
  studentId: Joi.string().min(3).max(20).required()
});

module.exports = {
  studentSchema,
  studentIdSchema
};
