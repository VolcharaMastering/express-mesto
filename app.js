/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();
const { userRouter } = require('./routes/users');

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
}

connect();
