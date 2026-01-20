const { getDB } = require('../database/connect');
const { ObjectId } = require('mongodb');

const coursesModel = {};

// Get all courses
coursesModel.getAllCourses = async () => {
  try {
    const db = getDB();
    return await db.collection('Courses').find({}).toArray();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get a course by ID
coursesModel.getCourseById = async (courseId) => {
  try {
    const db = getDB();
    return await db.collection('Courses').findOne({ _id: new ObjectId(courseId) });
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error;
  }
};

// Add student to course
coursesModel.addStudentToCourse = async (courseId, studentId) => {
  try {
    const db = getDB();
    return await db.collection('Courses').updateOne(
      { _id: new ObjectId(courseId) },
      { $addToSet: { studentsEnrolled: studentId } }
    );
  } catch (error) {
    console.error('Error adding student to course:', error);
    throw error;
  }
};

// Remove student from course
coursesModel.removeStudentFromCourse = async (courseId, studentId) => {
  try {
    const db = getDB();
    return await db.collection('Courses').updateOne(
      { _id: new ObjectId(courseId) },
      { $pull: { studentsEnrolled: studentId } }
    );
  } catch (error) {
    console.error('Error removing student from course:', error);
    throw error;
  }
};

// Update course info
coursesModel.updateCourseById = async (courseId, course) => {
  try {
    const db = getDB();
    return await db.collection('Courses').updateOne(
      { _id: new ObjectId(courseId) },
      { $set: course }
    );
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Delete a course
coursesModel.deleteCourseById = async (courseId) => {
  try {
    const db = getDB();
    return await db.collection('Courses').deleteOne({ _id: new ObjectId(courseId) });
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

module.exports = coursesModel;
