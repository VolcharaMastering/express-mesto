/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const NotFound = require('../errors/notFound');
const PermissionError = require('../errors/permissionError');
const IncorrectData = require('../errors/requestError');
const ServerError = require('../errors/serverError');
const User = require('../models/User');

const { OK_CODE, CODE_CREATED } = require('../states/states');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new PermissionError('Поля необходимо заполнить.'));
    return;
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new AuthError('Неверное имя пользователя или пароль'));
      return;
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      next(new AuthError('Неверное имя пользователя или пароль'));
      return;
    }
    const token = jwt.sign({
      _id: user._id,
    }, process.env.JWT_SECRET);
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
      // secure: true,
    });
    res.status(OK_CODE).send(user.toJSON());
  } catch (e) {
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const aboutMe = async (req, res, next) => {
  const myId = req.user._id;
  try {
    const me = await User.findById(myId);
    if (!me) {
      next(new NotFound('Такого пользователя нет'));
      return;
    }
    res.status(OK_CODE).send(me);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new IncorrectData('Невалидный id', myId));
      return;
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(OK_CODE).send(users);
  } catch (e) {
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new NotFound('Такого пользователя нет'));
      return;
    }
    res.status(OK_CODE).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new IncorrectData('Невалидный id'));
      return;
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
};
const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  const checkMail = await User.findOne({ email });
  if (checkMail) {
    next(new IncorrectData('Такой email уже есть в базе'));
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      email, password: hashedPassword, name, about, avatar,
    }).save();
    res.status(CODE_CREATED).send(user);
  } catch (e) {
    if (e.code === 11000) {
      next(new IncorrectData('Пользователь с таким email уже существует.'));
      return;
    }
    if (e.name === 'ValidatorError') {
      next(new IncorrectData('Запрос не прошёл валидацию'));
      return;
    }

    next(new ServerError('Произошла ошибка на сервере', e.message));
  }
};
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFound('Такого пользователя нет'));
        return;
      }
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new IncorrectData('Некорректные данные'));
        return;
      }
      next(new ServerError('Произошла ошибка на сервере'));
    });
};
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFound('Такого пользователя нет'));
        return;
      }
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new IncorrectData('Некорректные данные'));
        return;
      }
      next(new ServerError('Произошла ошибка на сервере'));
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  aboutMe,
};
