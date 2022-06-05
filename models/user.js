const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  about: {
    type: String,
  },
  avatar: {
    type: String,
  },
});
