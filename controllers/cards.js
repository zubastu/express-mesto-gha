const Card = require('../models/card');
const { checkBadData, errorProcessing } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => checkBadData(cards, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => checkBadData(card, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.deleteCard = (req, res) => {
  const { _id } = req.user;
  Card.findOneAndDelete(_id)
    .then((card) => checkBadData(card, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.likeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => checkBadData(card, res))
    .catch((err) => errorProcessing(err, res));
};

module.exports.dislikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => checkBadData(card, res))
    .catch((err) => errorProcessing(err, res));
};
