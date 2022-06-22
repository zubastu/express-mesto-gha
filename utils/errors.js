const BAD_REQ = 400;
const WRONG_PASS_OR_EMAIL = 401;
const WRONG_OWNER = 403;
const NOT_FOUND = 404;
const REGISTRATION_WITH_USED_EMAIL = 409;
const DEFAULT_ERROR_CODE = 500;

module.exports.errorProcessing = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(BAD_REQ).send({ message: `Ошибка передачи данных, все поля должны быть заполнены корректно: ${err.message}` });
    case 'CastError':
      return res.status(BAD_REQ).send({ message: `Не найдено по входным данным: ${err.message}` });
    default:
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
  }
};

module.exports.checkBadData = (data, res) => {
  if (!data) {
    return res.status(NOT_FOUND).send({ message: 'Не найдено' });
  }
  return res.send({ data });
};

module.exports.checkUser = (data, res) => {
  if (!data) {
    return res.status(WRONG_PASS_OR_EMAIL).send({ message: 'Не правильная почта или пароль' });
  }
  return res.send({ data });
};
