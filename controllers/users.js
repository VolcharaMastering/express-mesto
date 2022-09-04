/* eslint-disable linebreak-style */
const { User } = require('../models/user');

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  /*   if (!User[id]) {
    res.send({ error: 'Такого пользователя нет' });
    return;
  } */
  res.status(200).send(user);
};
const createUser = (req, res) => {

};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
