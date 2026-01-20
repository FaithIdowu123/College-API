const Joi = require('joi');
const { getDB } = require('../database/connect');

const addStudentSchema = Joi.object({
  studentId: Joi.string().min(3).max(20).required().external(async (value) => {
    const db = getDB();
    const student = await db.collection('Students').findOne({ studentId: value });
    if (!student) {
      throw new Error(`Student with ID ${value} does not exist`);
    }
    return value; // must return the value
  })
});

// Validate a course object (for PUT/update)
const courseSchema = Joi.object({
  courseId: Joi.string().min(2).max(20).required(),
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  credits: Joi.number().integer().min(1).max(10).required(),
  department: Joi.string().min(2).max(50).required(),
  semester: Joi.string().min(3).max(50).required(),
  instructor: Joi.string().min(2).max(100).required()
});

module.exports = {
  addStudentSchema,
  courseSchema
};
