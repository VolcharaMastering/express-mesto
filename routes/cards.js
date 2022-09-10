/* eslint-disable linebreak-style */
const express = require('express');

const cardsRouter = express.Router();
const {
  getCards, delCardById, createCard, likeCard, dislikeCard, routeNotFoud,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.delete('/cards/:cardId/', delCardById);
cardsRouter.post('/cards/', createCard);
cardsRouter.delete('/cards/:cardId/likes', dislikeCard);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.all('*', routeNotFoud);

module.exports = cardsRouter;
