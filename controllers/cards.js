const Card = require('../models/card');

const errorCard = (errorName, errorMessage) => {
  const error = new Error(errorMessage.toString());
  error.name = errorName.toString();
  return error;
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { _id } = req.user;
  Card.findOneAndDelete(_id)
    .then((card) => {
      if (req.params.cardId.length < 24) throw errorCard('UndefinedId', 'Такого id не существует');
      if (!card) throw errorCard('InvalidId', 'Карточка не найдена');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'UndefinedId') return res.status(400).send({ message: err.message });
      if (err.name === 'InvalidId') return res.status(404).send({ message: err.message });
      return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => {
      if (!card) throw errorCard('InvalidId', 'Карточка не найдена');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'InvalidId') return res.status(404).send({ message: err.message });
      if (err.name === 'CastError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => {
      if (!card) throw errorCard('InvalidId', 'Карточка не найдена');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'InvalidId') return res.status(404).send({ message: err.message });
      if (err.name === 'CastError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: err.message });
    });
};
