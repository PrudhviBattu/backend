const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// @desc Register user
// @route POST /api/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User data');
  }
});

// @desc Authenticate a user
// @route POST /api/user
// @access Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

// @desc GET a user
// @route GET /api/user
// @access Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc Delete user
// @route delete /api/user/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted user ${req.params.id}` });
});

// Generate the token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
};
