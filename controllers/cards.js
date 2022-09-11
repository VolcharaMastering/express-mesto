/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const Card = require('../models/Card');

const {
  OK_CODE, CODE_CREATED, INCORRECT_DATA, NOT_FOUND, SERVER_ERROR,
} = require('../states/states');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(OK_CODE).send(cards);
  } catch (evt) {
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const delCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      res.status(NOT_FOUND).send({ message: 'Нет такой карточки' });
      return;
    }
    res.status(OK_CODE).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(INCORRECT_DATA).send({ message: 'Невалидный id ' });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
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
        res.status(INCORRECT_DATA).send({ message: 'Запрос не прошёл валидацию' });
        return;
      }
    }
    if (e.errors.link) {
      if (e.errors.link.name === 'ValidatorError') {
        res.status(INCORRECT_DATA).send({ message: 'Запрос не прошёл валидацию' });
        return;
      }
    }
    res.status(SERVER_ERROR).send({ message: 'Произошла post ошибка на сервере' });
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
        res.status(NOT_FOUND).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(INCORRECT_DATA).send({ message: 'Невалидный id ' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
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
        res.status(NOT_FOUND).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(INCORRECT_DATA).send({ message: 'Невалидный id ' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
};
