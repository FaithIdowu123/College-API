const express = require('express');
const routes = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const studentRoutes = require('./student');
const courseRoutes = require('./course'); 
const passport = require('passport');

routes.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {});

routes.get("/logout", function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
        res.redirect('/');
    });
});

// Use routes
routes.use('/student', studentRoutes);  // all student routes under /students
routes.use('/course', courseRoutes);    // all course routes under /courses

// Error handling middleware


// Swagger UI
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = routes;
