const Joi = require('joi');

const addStudentSchema = Joi.object({
  studentId: Joi.string().min(3).max(20).required()
});

module.exports = {
  addStudentSchema
};
