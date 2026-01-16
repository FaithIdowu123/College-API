const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'College API',
    description: 'CSE 341 CRUD API using MongoDB'
  },
  host: 'college-api-gz7o.onrender.com/student',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/student.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
