const router = require('express').Router();
const { validateUserAuth, validateUserCreate } = require('../utils/validator');
const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserAuth, login);
router.post('/signout', logout);

module.exports = router;
