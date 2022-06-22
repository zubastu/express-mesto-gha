const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkBadData, errorProcessing } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => checkBadData(users, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => checkBadData(user, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.getUserSelf = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => checkBadData(user, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(403).send({ message: 'Пользователь с таким email уже есть!' });
    } else {
      bcrypt.hash(password, 5).then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
        .then((userInfo) => checkBadData(userInfo, res))
        .catch((err) => errorProcessing(err, res));
    }
  });
};

module.exports.patchUserInfo = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(_id, { $set: { name, about } }, { new: true, runValidators: true })
    .then((userInfo) => checkBadData(userInfo, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.patchAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { $set: { avatar } }, { new: true, runValidators: true })
    .then((userAvatar) => checkBadData(userAvatar, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email или пароль не могут быть пустыми' });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      const { name, email, avatar } = user;
      return res.send({
        name, email, avatar, token,
      });
    })
    .catch((err) => res
      .status(401)
      .send({ message: err.message }));
};

class customError extends Error {
  constructor(message, name, statusCode) {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

function errorProcess(err, res, req) {
  if (err.name === 'SomeError') {
    return res.status(err.statusCode).send({ mesage: err.message });
  }
}

User.findOne(sdfsdf).then((user) => {
  if (user.name === 'Вася Пупкин') {
    throw new customError('Сообщение ошибки', 'Ошибка Васи Пупкина', '5000500');
  }
}).catch((err) => errorProcess(err));
