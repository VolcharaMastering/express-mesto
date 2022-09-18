/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const path = require('path');
// const bodyParser =require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorValidator');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(express.json());
app.use(errorHandler);

app.post('/signin/', login);
app.post('/signup/', createUser);
app.use(auth);
app.use(require('./routes/cards'));
app.use(require('./routes/users'));

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
}

connect();
