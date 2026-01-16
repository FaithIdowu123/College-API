const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'College API',
    description: 'CSE 341 CRUD API using MongoDB'
  },
  host: 'localhost:3000/student',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/student.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
