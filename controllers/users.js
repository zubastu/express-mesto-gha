const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { _id } = req.params;
  User.findOne(_id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchUserInfo = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { $set: { avatar } }, { new: true, runValidators: true })
    .then((userInfo) => res.send({ data: userInfo }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.patchAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { $set: { avatar } }, { new: true, runValidators: true })
    .then((userInfo) => res.send({ data: userInfo }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
