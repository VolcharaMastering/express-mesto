/* eslint-disable linebreak-style */
const Card = require('../models/Card');

const OK_CODE = 200;
const CODE_CREATED = 201;
const INCORRECT_DATA = 400;
const AUTH_ERROR = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(OK_CODE).send(cards);
  } catch (evt) {
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};

const delCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      res.status(INCORRECT_DATA).send({ message: 'Нет такой карточки' });
      return;
    }
    if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
      res.status(AUTH_ERROR).send({ message: 'У вас не достаточно прав для удаления карточки' });
      return;
    }
    await Card.findByIdAndDelete(cardId);
    res.status(OK_CODE).send(card);
  } catch (evt) {
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};
const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await new Card({ name, link, owner: req.user._id }).save();
    res.status(CODE_CREATED).send(card);
  } catch ({ name: e }) {
    if (e === 'ValidatorError') {
      res.status(INCORRECT_DATA).send({ message: 'Запрос не прошёл валидацию.', e });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'Произошла post ошибка на сервере', ...e });
  }
};
const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $push: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.status(CODE_CREATED).send({ data: card });
    })
    .catch((e) => res.status(SERVER_ERROR).send({ message: 'Произошла post ошибка на сервере', ...e }));
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
      res.status(CODE_CREATED).send({ data: card });
    })
    .catch((e) => res.status(SERVER_ERROR).send({ message: 'Произошла post ошибка на сервере', ...e }));
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
};
