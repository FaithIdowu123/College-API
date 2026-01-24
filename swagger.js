const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'College API',
    description: 'CSE 341 CRUD API using MongoDB'
  },
  host: 'localhost:3000',
  schemes: ['http']
  /* host: 'college-api-gz7o.onrender.com',
  schemes: ['https'] */
};

// Output file for Swagger JSON
const outputFile = './swagger-output.json';

// List of route files to include in Swagger
const endpointsFiles = [
  './routes/index.js' // <-- add your courses routes here
];

// Generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);
