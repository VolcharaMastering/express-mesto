/* eslint-disable linebreak-style */
const express = require('express');

const userRouter = express.Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, routeNotFoud, aboutMe,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', aboutMe);
userRouter.get('/users/:userId', getUserById);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);
userRouter.all('*', routeNotFoud);

module.exports = userRouter;
