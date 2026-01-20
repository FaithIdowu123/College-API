const coursesModel = require('../models/course');

const coursesController = {};

// Get all courses
coursesController.getAllCourses = async (req, res) => {
    const courses = await coursesModel.getAllCourses();
    if (courses.length === 0) {
        const error = new Error('No courses found');
        error.status = 400;
        throw error;
    }
    res.json(courses);
};

// Get a course by ID
coursesController.getCourseById = async (req, res) => {
    const courseId = req.params.id;
    const course = await coursesModel.getCourseById(courseId);
    if (!course) {
        const error = new Error('Course not found');
        error.status = 400;
        throw error;
    }
    res.json(course);
};

// Add a student to a course
coursesController.addStudentToCourse = async (req, res) => {
    const courseId = req.params.id;
    const studentId = req.body.studentId;

    if (!studentId) {
        const error = new Error('Student ID is required');
        error.status = 400;
        throw error;
    }

    const result = await coursesModel.addStudentToCourse(courseId, studentId);
    if (result.modifiedCount === 0) {
        const error = new Error('Student could not be added (maybe already enrolled or course not found)');
        error.status = 400;
        throw error;
    }

    res.status(201).json({ Message: "Student added to course" });
};

// Remove a student from a course
coursesController.removeStudentFromCourse = async (req, res) => {
    const courseId = req.params.id;
    const studentId = req.body.studentId;

    if (!studentId) {
        const error = new Error('Student ID is required');
        error.status = 400;
        throw error;
    }

    const result = await coursesModel.removeStudentFromCourse(courseId, studentId);
    if (result.modifiedCount === 0) {
        const error = new Error('Student could not be removed (maybe not enrolled or course not found)');
        error.status = 400;
        throw error;
    }

    res.status(201).json({ Message: "Student removed from course" });
};

module.exports = coursesController;
