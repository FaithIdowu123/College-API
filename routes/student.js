const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');
const { studentSchema } = require('../utilities/student');
const validate = require('../utilities/validate');

// GET all students
routes.get("/", async (req, res, next) => {
    try {
        await studentController.getAllStudents(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to fetch students"
        });
    }
});

// GET student by ID
routes.get("/:id", async (req, res, next) => {
    try {
        await studentController.getStudentById(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to fetch student"
        });
    }
});

// POST new student
routes.post("/", validate(studentSchema), async (req, res) => {
    try {
        await studentController.addStudent(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to add student"
        });
    }
});

// PUT update student
routes.put("/:id", validate(studentSchema), async (req, res) => {
    try {
        await studentController.updateStudent(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to update student"
        });
    }
});

// DELETE student
routes.delete("/:id", async (req, res) => {
    try {
        await studentController.deleteStudent(req, res);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Failed to delete student"
        });
    }
});

module.exports = routes;