const express = require('express');
const routes = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const errorHandler = require("./utilities/errorHandler")

const studentRoutes = require('./student');
const courseRoutes = require('./course'); 

// Use routes
routes.use('/student', studentRoutes);  // all student routes under /students
routes.use('/course', courseRoutes);    // all course routes under /courses

// Swagger UI
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.use(errorHandler);

module.exports = routes;
