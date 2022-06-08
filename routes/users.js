const router = require('express').Router();
const {
  getUsers, getUser, createUser, patchUserInfo, patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
