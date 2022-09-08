/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
// const bodyParser =require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log(req.method, req.params);
  next();
})
app.use((req, res, next) => {
  req.user = {
    _id: '6317b2bf044e629b2aa2586d'
  };

  next();
});
app.use(express.json());
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
