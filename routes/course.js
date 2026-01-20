const express = require('express');
const routes = express.Router();
const coursesController = require('../controllers/course');
const { addStudentSchema, courseSchema } = require('../utilities/course'); // Joi schema for studentId
const validate = require('../utilities/validate');

// GET all courses
routes.get("/", async (req, res) => {
    try {
        await coursesController.getAllCourses(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to fetch courses"
        }
        next(error);
    }
});

// GET course by ID
routes.get("/:id", async (req, res) => {
    try {
        await coursesController.getCourseById(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to fetch course"
        }
        next(error);
    }
});

// POST add student to a course
routes.post("/:id/add-student", validate(addStudentSchema), async (req, res) => {
    try {
        await coursesController.addStudentToCourse(req, res);
    } catch (error) {
       if (error.status == 500){
            error.message = "Failed to add student to course"
        }
        next(error);
    }
});

// POST remove student from a course
routes.post("/:id/remove-student", validate(addStudentSchema), async (req, res) => {
    try {
        await coursesController.removeStudentFromCourse(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to remove student from course"
        }
        next(error);
    }
});

// update course
routes.put("/:id", validate(courseSchema), async (req, res) => {
  try {
    await coursesController.updateCourse(req, res);
  } catch (error) {
        if (error.status == 500){
            error.message = "Failed to update course"
        }
        next(error);
  }
});

// Delete course
routes.delete("/:id", validate(courseSchema), async (req, res) => {
  try {
    await coursesController.deleteCourse(req, res);
  } catch (error) {
        if (error.status == 500){
            error.message = "Failed to delete course"
        }
        next(error);
  }
});

module.exports = routes;
