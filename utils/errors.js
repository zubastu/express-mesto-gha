const BAD_REQ = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR_CODE = 500;

module.exports.errorProcessing = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(BAD_REQ).send({ message: 'Ошибка передачи данных, все поля должны быть заполнены корректно' });
    case 'CastError':
      return res.status(BAD_REQ).send({ message: 'Не найдено по входным данным' });
    default:
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
  }
};

module.exports.checkBadData = (data, res) => {
  console.log();
  if (!data) {
    return res.status(NOT_FOUND).send({ message: 'Не найдено' });
  }
  return res.send({ data });
};
