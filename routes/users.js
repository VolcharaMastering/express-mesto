/* eslint-disable linebreak-style */
const userRouter = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);

module.exports = userRouter;
