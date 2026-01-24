const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
    try {
        const saltRounds = 10; // higher = more secure but slower
        const salt = await bcrypt.genSalt(saltRounds); // generate salt
        const hashedPassword = await bcrypt.hash(plainPassword, salt); // hash password
        return hashedPassword;
    } catch (err) {
        console.error(err);
        throw new Error('Error hashing password');
    }
}
async function comparePassword(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
        console.error(err);
        throw new Error('Error comparing password');
    }
}

module.exports = { hashPassword, comparePassword };