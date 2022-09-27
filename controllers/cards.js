/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const NotFound = require('../errors/notFound');
const IncorrectData = require('../errors/requestError');
const ServerError = require('../errors/serverError');
const Card = require('../models/Card');

const {
  OK_CODE, CODE_CREATED, INCORRECT_DATA, NOT_FOUND, SERVER_ERROR,
} = require('../states/states');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(OK_CODE).send(cards);
  } catch (evt) {
    next(new ServerError('Произошла ошибка на сервере'));
  }
};

const delCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      next(new NotFound('Нет такой карточки' ));
      return;
    }
    res.status(OK_CODE).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new IncorrectData('Невалидный id ' ));
      return;
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
};
const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await new Card({ name, link, owner: req.user._id }).save();
    res.status(CODE_CREATED).send(card);
  } catch (e) {
    if (e.errors.name) {
      if (e.errors.name.name === 'ValidatorError') {
        next(new IncorrectData('Запрос не прошёл валидацию' ));
        return;
      }
    }
    if (e.errors.link) {
      if (e.errors.link.name === 'ValidatorError') {
        next(new IncorrectData('Запрос не прошёл валидацию' ));
        return;
      }
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
};
const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $push: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFound('Нет такой карточки' ));
        return;
      }
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new IncorrectData('Невалидный id ' ));
        return;
      }
      next(new ServerError('Произошла ошибка на сервере'));
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFound('Нет такой карточки' ));
        return;
      }
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new IncorrectData('Невалидный id ' ));
        return;
      }
      next(new ServerError('Произошла ошибка на сервере'));
    });
};
const routeNotFoud = (req, res, next) => {
  next(new NotFound('Страница не найдена'));
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
  routeNotFoud,
};
