const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../utils/constants');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const { NODE_ENV, JWT_SECRET } = process.env;

const HandleAuthError = (req, res, next) => next(new ErrorAccess('Необходима авторизация'));
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new HandleAuthError('Необходимо авторизоваться'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(new HandleAuthError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
