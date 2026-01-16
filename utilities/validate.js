const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // <-- key change

    if (error) {
      // Map all errors into an array of messages
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }

    next(); // Validation passed, continue to controller
  };
};

module.exports = validate;
