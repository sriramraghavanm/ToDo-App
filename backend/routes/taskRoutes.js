const express = require('express');
const auth = require('../middleware/auth');
const { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController');

const router = express.Router();

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
router.post('/', auth, createTask);

// @desc    Get all user tasks
// @route   GET /api/tasks
// @access  Private
router.get('/', auth, getTasks);

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
router.put('/:id', auth, updateTask);

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete('/:id', auth, deleteTask);

module.exports = router;