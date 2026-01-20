const Joi = require('joi');

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

module.exports = {
  addStudentSchema
};
