/* eslint-disable linebreak-style */
const express = require('express');

const cardsRouter = express.Router();
const { getCards, delCardById, createCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.delete('/cards/:cardId/', delCardById);
cardsRouter.post('/cards/', createCard);

module.exports = cardsRouter;
