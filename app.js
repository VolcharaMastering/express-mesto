/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
// const bodyParser =require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const cookieParser = require('cookie-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(express.json());
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
