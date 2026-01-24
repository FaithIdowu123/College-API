const express = require('express');
const routes = express.Router();
const authController = require('../controllers/auth');
const { isauthenticated } = require('../utilities/authenticate');
const {registerSchema, loginSchema } = require('../utilities/authSchema');
const passport = require('../utilities/passport');
const validate = require('../utilities/validate');

// POST: Register new user
routes.post("/register", validate(registerSchema), async (req, res, next) => {
    try {
        await authController.register(req, res);
    } catch (error) {
        if (!error.status) error.status = 500;
        next(error);
    }
});

// POST: Login user
routes.post("/login", validate(loginSchema), async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return res.status(400).json({ message: 'Already logged in.' });
        }
        await authController.login(req, res);
    } catch (error) {
        if (!error.status) error.status = 500;
        next(error);
    }
});

// GET: Logout user
routes.get("/logout", isauthenticated, (req, res, next) => {
    try {
        authController.logout(req, res);
    } catch (error) {
        if (!error.status) error.status = 500;
        next(error);
    }
});

// GET: Get current logged-in user profile
routes.get("/profile", isauthenticated, (req, res, next) => {
    try {
        authController.getProfile(req, res);
    } catch (error) {
        if (!error.status) error.status = 500;
        next(error);
    }
});

routes.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/'); 
  }
);

module.exports = routes;
