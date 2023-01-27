const express = require('express');
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/userController');

// router.get('/', getUsers);
// router.post('/', createUser); minimizing these 2 by chaining
router.route('/').get(getUsers).post(createUser);

// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);
// router.get('/:id', getUser); minimizing these 3 by chaining
router.route('/:id').put(updateUser).delete(deleteUser).get(getUser);

module.exports = router;
