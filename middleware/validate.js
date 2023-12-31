const { validationResult } = require('express-validator')

module.exports = validations => async (req, res, next) => {
  for (let validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ error: errors.array()[0] });
};