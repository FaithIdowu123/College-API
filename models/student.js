const { getDB } = require('../database/connect');
const { ObjectId } = require('mongodb');

const studentsModel = {};

studentsModel.getAllStudents = async() => {
  try {
    const db = getDB();
    const students = await db.collection('Students').find({}).toArray();
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

studentsModel.getStudentById = async(studentId) => {
  try {
    const db = getDB();
    const student = await db.collection('Students').find({ _id: new ObjectId(studentId) }).toArray();
    return student;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw error;
  }
};

studentsModel.addStudent = async(student) => {
  try {
    const db = getDB();
    const result = await db.collection('Students').insertOne(student);
    return result
  } catch (error) {
    console.error("Error Adding student:", error);
    throw error;
  }
}

studentsModel.updateStudentById = async (studentId, student) => {
  try {
    const db = getDB();
    const result = await db.collection('Students').updateOne({ _id: new ObjectId(studentId) }, { $set: student });
    return result
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
}

studentsModel.deleteStudentById = async (studentId) => {
  try {
    const db = getDB();
    const result = await db.collection('Students').deleteOne({ _id: new ObjectId(studentId) });
    return result;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

module.exports = studentsModel;