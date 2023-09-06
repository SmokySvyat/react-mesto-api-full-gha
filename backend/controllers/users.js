const { ValidationError, CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  ERROR_CODE_UNIQUE, STATUS_OK, CREATED,
} = require('../utils/constants');
const BadRequest = require('../utils/errors/BadRequest');
const NotFound = require('../utils/errors/NotFound');
const NotUnique = require('../utils/errors/NotUnique');
// const ErrorAccess = require('../utils/errors/ErrorAccess');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const findById = (req, res, next, id) => {
  User.findById(id)
    .orFail(new NotFound(`Пользователь по указанному id: ${id} не найден`))
    .then((user) => res.send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  findById(req, res, next, userId);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  findById(req, res, next, _id);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res.status(CREATED).send({
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new NotUnique('Пользователь с такой почтой уже зарегистрирован'));
      } else if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

const updateProfileInfo = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate({ _id }, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному id не найден'));
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        next(new BadRequest('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate({ _id }, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному id не найден');
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        next(new BadRequest('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('userId', token, {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: true,
      });
      res.send(user);
    })
    .catch((error) => {
      next(error);
    });
};

const logout = (req, res) => {
  res.clearCookie('userId').send({ message: 'Вы успешно вышли из профиля' });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateAvatar,
  updateProfileInfo,
  login,
  getCurrentUser,
  findById,
  logout,
};
