const router = require('express').Router();
const {
  getUsers, getUser, patchUserInfo, patchAvatar, getUserSelf,
} = require('../controllers/users');

router.get('/', getUsers);
router.patch('/me', patchUserInfo);
router.get('/me', getUserSelf);
router.patch('/me/avatar', patchAvatar);
router.get('/:id', getUser);

module.exports = router;
