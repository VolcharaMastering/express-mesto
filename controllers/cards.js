/* eslint-disable linebreak-style */
const Card = require('../models/Card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (evt) {
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};
const delCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      res.status(404).send({ message: 'Такого пользователя нет' });
      return;
    }
    res.status(200).send(card);
  } catch (evt) {
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...evt });
  }
};
const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await new Card({ name, link, owner: req.user._id }).save();
    res.status(200).send(card);
  } catch (e) {
    if (e.errors.likes === 'stringValue') {
      res.status(400).send({ message: 'Запрос не прошёл валидацию. Ошибка в лайках', ...e });
      return;
    }
    res.status(500).send({ message: 'Произошла post ошибка на сервере', ...e });
  }
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((e) => res.status(500).send({ message: 'Произошла post ошибка на сервере', ...e }));
};
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((e) => res.status(500).send({ message: 'Произошла post ошибка на сервере', ...e }));
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
};
