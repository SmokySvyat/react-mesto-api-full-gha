const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const handleAuthError = (req, res, next) => next(new ErrorAccess('Необходима авторизация'));
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.userId;

  if (!token) {
    return handleAuthError(req, res, next);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(req, res, next);
  }
  req.user = payload;
  next();
};

module.exports = auth;
