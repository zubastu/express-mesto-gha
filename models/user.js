const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Поле "name" должно содержать не меньше 2 символов'],
    maxlength: [30, 'Поле "name" должно содержать не больше 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Поле "about" должно содержать не меньше 2 символов'],
    maxlength: [30, 'Поле "about" должно содержать не больше 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
