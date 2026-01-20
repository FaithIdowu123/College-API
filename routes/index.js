const express = require('express');
const routes = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Import your route files
const studentRoutes = require('./student');
const courseRoutes = require('./course'); // make sure this matches your file name

// Use routes
routes.use('/student', studentRoutes);  // all student routes under /students
routes.use('/course', courseRoutes);    // all course routes under /courses

// Swagger UI
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = routes;
