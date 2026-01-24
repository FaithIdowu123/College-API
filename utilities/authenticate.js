const isauthenticated = (req, res, next) => {
    console.log("emts");
    if (!req.session.user) {
       const validationError = new Error('You do not have access');
       validationError.status = 401;// optional, include all messages
       next(validationError);
    }
    next();
}

module.exports = {
    isauthenticated
};