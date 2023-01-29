const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  getUser
} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddlewear');

router.post('/', registerUser)
router.get('/me', protect, getUser);
router.post('/login', loginUser);


module.exports = router;
