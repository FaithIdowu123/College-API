const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');
const { studentSchema } = require('../utilities/student');
const validate = require('../utilities/validate');

routes.get("/", async (req, res, next) => {
    try {
        await studentController.getAllStudents(req, res);
    } catch(error) {
        if (error.status == 500){
            error.message = "Failed to fetch students"
        }
        next(error);
    }
});

routes.get("/:id", async (req, res, next) => {
    try {
        await studentController.getStudentById(req, res);
    } catch(error) {
        if (error.status == 500){
            error.message = "Failed to fetch student"
        }
        next(error);
    }
});

routes.post("/", validate(studentSchema), studentController.addStudent);

routes.put("/:id", validate(studentSchema), studentController.updateStudent);

routes.delete("/:id", studentController.deleteStudent);

module.exports = routes;