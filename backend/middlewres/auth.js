const jwt = require('jsonwebtoken');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const { JWT_SECRET } = process.env;

const handleAuthError = (req, res, next) => next(new ErrorAccess('Необходима авторизация'));
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return handleAuthError(req, res, next);
    }
    const payload = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return handleAuthError(req, res, next);
  }
};

module.exports = auth;
