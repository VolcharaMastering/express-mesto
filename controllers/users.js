/* eslint-disable linebreak-style */
const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // eslint-disable-next-line no-console
    console.log('Ищем юзверов');
    res.status(200).send(users);
  } catch (evt) {
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};
const getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log("ID=", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: 'Такого пользователя нет' });
      return;
    }
    res.status(200).send(user);
  } catch (evt) {
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    console.log(req.body);
    res.status(200).send(user);
  } catch (e) {
    if (e.errors.about.name === 'ValidatorError') {
      res.status(400).send({ message: 'Запрос не прошёл валидацию', ...e });
      return;
    }
    res.status(500).send({ message: 'Произошла post ошибка на сервере', ...e });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
