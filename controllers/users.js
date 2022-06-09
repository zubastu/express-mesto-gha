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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => checkBadData(user, res))
    .catch((err) => errorProcessing(err, res));
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
