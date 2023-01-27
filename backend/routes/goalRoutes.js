const express = require('express');
const router = express.Router();
const {
  getGoal,
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
} = require('../controllers/goalController');

// router.get('/', getGoals);
// router.post('/', createGoal); minimizing these 2 by chaining
router.route('/').get(getGoals).post(createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.get('/:id', getGoal); minimizing these 3 by chaining
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
