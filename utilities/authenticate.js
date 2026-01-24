

const isauthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: 'You are not logged in.' });
  next();
};



module.exports = { isauthenticated };