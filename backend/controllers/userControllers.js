const asyncHandler = require('express-async-handler');

// @desc Get user
// @route GET /api/goals/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get user ${req.params.id}` });
});

// @desc Get user
// @route GET /api/goals
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get users' });
});

// @desc Update user
// @route PUT /api/goals/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated user ${req.params.id}` });
});

// @desc create user
// @route POST /api/goals
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.status(400);
    throw new Error('Please send email, password, firstName, lastName');
  } else {
    res.status(200).json({ message: `Created user` });
  }
  console.log(email, password, firstName, lastName);
});

// @desc Delete user
// @route delete /api/goals/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted user ${req.params.id}` });
});

module.exports = {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
};
