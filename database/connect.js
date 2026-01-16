const { MongoClient } = require('mongodb');

let database;

const connectDB = async () => {
  if (database) return database;

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  database = client.db();

  console.log('MongoDB connected');
  return database;
};

const getDB = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { connectDB, getDB };