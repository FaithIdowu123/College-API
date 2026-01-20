const { getDB } = require('../database/connect');
const { ObjectId } = require('mongodb');

const coursesModel = {};

// Get all courses
coursesModel.getAllCourses = async () => {
  try {
    const db = getDB();
    const courses = await db.collection('Courses').find({}).toArray();
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get a course by ID
coursesModel.getCourseById = async (courseId) => {
  try {
    const db = getDB();
    const course = await db.collection('Courses').findOne({ _id: new ObjectId(courseId) });
    return course;
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error;
  }
};

// Add a student to a course
coursesModel.addStudentToCourse = async (courseId, studentId) => {
  try {
    const db = getDB();
    const result = await db.collection('Courses').updateOne(
      { _id: new ObjectId(courseId) },
      { $addToSet: { studentsEnrolled: studentId } } // adds student if not already in the array
    );
    return result;
  } catch (error) {
    console.error('Error adding student to course:', error);
    throw error;
  }
};

// Remove a student from a course
coursesModel.removeStudentFromCourse = async (courseId, studentId) => {
  try {
    const db = getDB();
    const result = await db.collection('Courses').updateOne(
      { _id: new ObjectId(courseId) },
      { $pull: { studentsEnrolled: studentId } } // removes student from array
    );
    return result;
  } catch (error) {
    console.error('Error removing student from course:', error);
    throw error;
  }
};

module.exports = coursesModel;
