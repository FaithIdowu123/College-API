const express = require('express');
const routes = express.Router();
const coursesController = require('../controllers/course');
const { addStudentSchema } = require('../utilities/course'); // Joi schema for studentId
const validate = require('../utilities/validate');

// GET all courses
routes.get("/", async (req, res) => {
    try {
        await coursesController.getAllCourses(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to fetch courses"
        });
    }
});

// GET course by ID
routes.get("/:id", async (req, res) => {
    try {
        await coursesController.getCourseById(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to fetch course"
        });
    }
});

// POST add student to a course
routes.post("/:id/add-student", validate(addStudentSchema), async (req, res) => {
    try {
        await coursesController.addStudentToCourse(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to add student to course"
        });
    }
});

// POST remove student from a course
routes.post("/:id/remove-student", validate(addStudentSchema), async (req, res) => {
    try {
        await coursesController.removeStudentFromCourse(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to remove student from course"
        });
    }
});

module.exports = routes;
