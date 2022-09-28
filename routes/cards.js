/* eslint-disable linebreak-style */
const express = require('express');
const { validateCreateCard, validateCardId } = require('../middlewares/errorValidator');

const cardsRouter = express.Router();
const {
  getCards, delCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.delete('/cards/:cardId/', validateCardId, delCardById);
cardsRouter.post('/cards/', validateCreateCard, createCard);
cardsRouter.delete('/cards/:cardId/likes', validateCardId, dislikeCard);
cardsRouter.put('/cards/:cardId/likes', validateCardId, likeCard);

module.exports = cardsRouter;
