const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (id !== 'String') {
        const error = new Error('Не корректный id, он должен состоять из строки');
        error.name = 'InvalidId';
        return error;
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Пользователь по данному id не найден' });
      }
      if (err.name === 'InvalidId') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.patchUserInfo = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { $set: { avatar } }, { new: true, runValidators: true })
    .then((userInfo) => {
      if (!userInfo) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: userInfo });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.patchAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { $set: { avatar } }, { new: true, runValidators: true })
    .then((userAvatar) => {
      if (!userAvatar) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: userAvatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
