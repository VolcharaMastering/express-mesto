/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const validMail = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: true,
    validate: {
      validator(val) {
        return validMail.isEmail(val);
      },
      message: 'Проверьте формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    minlength: [6, 'Длина пароль не меньше 6ти символов'],
    select: false,
  },

  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Длина имени не меньше 2х символов'],
    maxlength: [30, 'Длина имени не более 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (val) => /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(val),
      message: 'Проверьте формат ссылки',
    },
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Длина поля about не меньше 2х символов'],
    maxlength: [30, 'Длина поля about не более 30 символов'],
  },
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
