/* eslint-disable linebreak-style */
const express = require('express');
const { validateUpdateAvatar, validateUpdateUser, validateUserId } = require('../middlewares/errorValidator');

const userRouter = express.Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, aboutMe,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', aboutMe);
userRouter.get('/users/:userId', validateUserId, getUserById);
userRouter.patch('/users/me', validateUpdateUser, updateUser);
userRouter.patch('/users/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = userRouter;
