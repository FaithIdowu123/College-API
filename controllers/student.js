const studentModel = require('../models/student');

const studentController = {};

studentController.getAllStudents = async (req, res) => {
    const students = await studentModel.getAllStudents();
    console.log(students)
    if (students.length == 0) {
        const error = new Error('No students found');
        error.status = 400;
        throw error;
    }
    res.json(students);
};

studentController.getStudentById = async (req, res) => {
    const studentId = req.params.id;
    const student = await studentModel.getStudentById(studentId);
    if (student.length == 0) {
        const error = new Error('Student not found');
        error.status = 400;
        throw error;
    }
    res.json(student);
};

studentController.addStudent = async (req, res) => {
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        studentId: req.body.studentId,
        major: req.body.major,
        enrollmentYear: req.body.enrollmentYear,
        isActive: req.body.isActive
    }

    const result = await studentModel.addStudent(student);
    console.log(result)
    if (!result) {
        const error = new Error('Student not added');
        error.status = 400;
        throw error;
    }
    res.status(201).json({ Message: "Student Added"});
}

studentController.updateStudent = async (req, res) => {
    const id = req.params.id;
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        studentId: req.body.studentId,
        major: req.body.major,
        enrollmentYear: req.body.enrollmentYear,
        isActive: req.body.isActive
    }

    const result = await studentModel.updateStudentById(id, student);
    if (result.modifiedCount == 0 ) {
        const error = new Error('Student not found');
        error.status = 400;
        throw error;
    }
    res.status(201).json({ Message: "Student updated"});
    
}

studentController.deleteStudent = async (req, res) => {
    const studentId = req.params.id;
    const result = await studentModel.deleteStudentById(studentId);
    if (result.deletedCount == 0) {
        const error = new Error('Student not found');
        error.status = 400;
        throw error;
    }
    res.status(201).json({ Message: "Student deleted"});
   
};

module.exports = studentController;