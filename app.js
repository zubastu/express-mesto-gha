const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const routeUsers = require('./routes/users');
/* const routeCards = require('./routes/cards'); */

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '629c78948e5515e73f8e9d1d', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/users', routeUsers);
/* app.use('/cards', routeCards); */

app.get('/', (req, res) => {
  res.send('<h1>Корневая страница</h1>');
});

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App started on ${PORT} port`);
    });
  }).catch((e) => console.log(e));
