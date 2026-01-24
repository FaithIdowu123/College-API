const authModel = require('../models/auth');
const hasher = require('../utilities/hasher');

const authController = {};

authController.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await hasher.hashPassword(password);

    const profile = { firstName, lastName, email, password: hashedPassword };

    const result = await authModel.addProfile(profile);
    if (!result) throw { status: 400, message: 'Profile not added' };

    res.status(201).json({ message: 'Profile added' });
};

authController.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await authModel.getProfileByEmail(email);

    if (!user) throw { status: 400, message: 'Invalid email' };

    const isPasswordValid = await hasher.comparePassword(password, user.password);
    if (!isPasswordValid) throw { status: 400, message: 'Invalid password' };

    req.login(user, (err) => {
        if (err) throw { status: 500, message: 'Login failed' };
        res.json({ message: 'Login successful' });
    });
}

authController.getProfile = (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' });
    res.json({ user: req.user });
};

authController.logout = (req, res) => {
    req.logout(() => res.json({ message: 'Logged out successfully' }));
};

module.exports = authController;
