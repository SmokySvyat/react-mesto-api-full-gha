const router = require('express').Router();
const NotFound = require('../utils/errors/NotFound');
const { validateUserAuth, validateUserCreate } = require('../utils/validator');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewres/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserAuth, login);

// router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});

module.exports = router;
