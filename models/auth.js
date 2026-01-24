// models/auth.js
const { getDB } = require('../database/connect'); // your MongoDB connection utility
const { ObjectId } = require('mongodb');

const authModel = {};

// Add a new profile
authModel.addProfile = async (profile) => {
    try {
        const db = getDB();
        const result = await db.collection('Users').insertOne(profile);
        return result;
    } catch (err) {
        console.error('Error adding profile:', err);
        throw err;
    }
};

// Get profile by email
authModel.getProfileByEmail = async (email) => {
    try {
        const db = getDB();
        const user = await db.collection('Users').findOne({ email: email });
        return user;
    } catch (err) {
        console.error('Error fetching profile:', err);
        throw err;
    }
};

// Optional: Get profile by ID
authModel.getProfileById = async (id) => {
    try {
        const db = getDB();
        const user = await db.collection('Users').findOne({ _id: new ObjectId(id) });
        return user;
    } catch (err) {
        console.error('Error fetching profile by ID:', err);
        throw err;
    }
};

module.exports = authModel;
