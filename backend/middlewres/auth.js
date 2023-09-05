const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../utils/constants');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (req, res, next) => next(new ErrorAccess('Необходима авторизация'));
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return handleAuthError(req, res, next);
    }
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    req.user = payload;
    next();
  } catch (err) {
    return handleAuthError(req, res, next);
  }
};

module.exports = auth;
