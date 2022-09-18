/* eslint-disable linebreak-style */
const express = require('express');
const auth = require('../middlewares/auth');

const userRouter = express.Router();
const {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar, routeNotFoud, login,
} = require('../controllers/users');


userRouter.post('/signin/', login);
userRouter.post('/users/', createUser);

userRouter.use(auth);
userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);
userRouter.all('*', routeNotFoud);

module.exports = userRouter;
