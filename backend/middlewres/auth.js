const jwt = require('jsonwebtoken');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ErrorAccess('Необходимо авторизоваться'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(new ErrorAccess('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
