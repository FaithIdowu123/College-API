const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');
const { studentSchema } = require('../utilities/student');
const validate = require('../utilities/validate');
const { isauthenticated } = require('../utilities/authenticate');

// GET all students
routes.get("/", async (req, res, next) => {
    try {
        await studentController.getAllStudents(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to fetch students"
        }
        next(error);
    }
});

// GET student by ID
routes.get("/:id", async (req, res, next) => {
    try {
        await studentController.getStudentById(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to fetch student"
        }
        next(error);
    }
});

// POST new student
routes.post("/", isauthenticated, validate(studentSchema), async (req, res, next) => {
    try {
        await studentController.addStudent(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to add student"
        }
        next(error);
    }
});

// PUT update student
routes.put("/:id", isauthenticated,validate(studentSchema), async (req, res, next) => {
    try {
        await studentController.updateStudent(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to update students"
        }
        next(error);
    }
});

// DELETE student
routes.delete("/:id", isauthenticated, async (req, res, next) => {
    try {
        await studentController.deleteStudent(req, res);
    } catch (error) {
        if (error.status == 500){
            error.message = "Failed to delete students"
        }
        next(error);
    }
});

module.exports = routes;