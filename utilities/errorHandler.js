const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  if (res.headersSent) {
    return next(err);
  }

  // Default to 500 Internal Server Error
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
    details: err.details || null
  });
};

module.exports = errorHandler;
