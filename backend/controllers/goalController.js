const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc Get user
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc create user
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text');
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

// @desc Update user
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.status(200).json(updatedGoal);
});

// @desc Delete user
// @route delete /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }
    // const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    await goal.remove()
    res.status(200).json({ message: `Deleted goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
};
