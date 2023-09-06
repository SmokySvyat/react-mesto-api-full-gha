const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewres/error');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewres/logger');

const app = express();
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(cors());
app.use(requestLogger);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected to the data base'));

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
