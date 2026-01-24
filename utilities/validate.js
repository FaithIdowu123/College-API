const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate the request body asynchronously
      await schema.validateAsync(req.body);
      next(); // Validation passed
    } catch (error) {
      // Map all Joi errors into an array of messages
      const errors = error.details ? error.details.map(detail => detail.message) : [error.message];

      // Create a new error object and pass it to next()
      const validationError = new Error('Validation failed');
      validationError.status = 400;
      validationError.details = errors; // optional, include all messages
      next(validationError); // <- pass to your errorHandler
    }
  };
};

module.exports = validate;

