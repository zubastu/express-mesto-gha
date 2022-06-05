const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  owner: {
    type: String,
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
  },
});
