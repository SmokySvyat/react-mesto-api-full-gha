const router = require('express').Router();
const { validateUserAuth, validateUserCreate } = require('../utils/validator');
const { createUser, login } = require('../controllers/users');

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserAuth, login);

module.exports = router;
