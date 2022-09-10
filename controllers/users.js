/* eslint-disable linebreak-style */
const User = require('../models/User');

const OK_CODE = 200;
const CODE_CREATED = 201;
const INCORRECT_DATA = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(OK_CODE).send(users);
  } catch (evt) {
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
      return;
    }
    res.status(OK_CODE).send(user);
  } catch (evt) {
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(CODE_CREATED).send(user);
  } catch ({ name: e }) {
    if (e === 'ValidatorError') {
      res.status(INCORRECT_DATA).send({ message: 'Запрос не прошёл валидацию', ...e });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'Произошла post ошибка на сервере', ...e });
  }
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name, about,
    },
    {
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
        return;
      }
      res.status(CODE_CREATED).send({ data: user });
    })
    .catch((e) => res.status(SERVER_ERROR).send({ message: 'Произошла post ошибка на сервере', ...e }));
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
        return;
      }
      res.status(CODE_CREATED).send({ data: user });
    })
    .catch((e) => res.status(SERVER_ERROR).send({ message: 'Произошла post ошибка на сервере', ...e }));
};
const routeNotFoud = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  routeNotFoud,
};
