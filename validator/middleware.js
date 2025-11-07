const validate = (schema, target = 'body') => {
  return (req, res, next) => {
    if (!schema) {
      return res.status(500).json({ error: 'Validation schema not found' });
    }
    const data = req[target] || {};
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message),
      });
    }
    req[target] = value;
    next();
  };
};

export default validate;
