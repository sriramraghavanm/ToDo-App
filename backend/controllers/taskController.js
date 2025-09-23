const Task = require('../models/Task');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    // Basic validation
    if (!title || !dueDate) {
      return res.status(400).json({ 
        msg: 'Title and due date are required' 
      });
    }

    // Ensure dueDate is a valid date
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ 
        msg: 'Invalid due date format' 
      });
    }

    // Validate status
    const validStatuses = ['Created', 'In Progress', 'Blocked', 'Postponed', 'Cancelled', 'Done'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        msg: 'Invalid status. Must be one of: ' + validStatuses.join(', ') 
      });
    }

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      dueDate: parsedDueDate,
      status: status || 'Created'
    });

    // Return just the task, not populated (simpler)
    res.status(201).json(task);

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      msg: 'Server error creating task' 
    });
  }
};

// @desc    Get all user tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .sort({ dueDate: 1, createdAt: -1 });

    // Return just the tasks array, not wrapped in an object
    res.json(tasks); // Changed from { success: true, count: tasks.length, tasks }

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ 
      msg: 'Server error fetching tasks' 
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;

    // Find task
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ 
        msg: 'Task not found' 
      });
    }

    // Check if user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ 
        msg: 'Not authorized to update this task' 
      });
    }

    // Validate dueDate if provided
    if (dueDate) {
      const parsedDueDate = new Date(dueDate);
      if (isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({ 
          msg: 'Invalid due date format' 
        });
      }
    }

    // Validate status if provided
    const validStatuses = ['Created', 'In Progress', 'Blocked', 'Postponed', 'Cancelled', 'Done'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        msg: 'Invalid status. Must be one of: ' + validStatuses.join(', ') 
      });
    }

    // Update task
    task = await Task.findByIdAndUpdate(
      id, 
      { 
        title: title || task.title,
        description: description !== undefined ? description : task.description,
        dueDate: dueDate ? new Date(dueDate) : task.dueDate,
        status: status || task.status
      }, 
      { 
        new: true, 
        runValidators: true 
      }
    );

    // Return just the updated task
    res.json(task); // Changed from { success: true, task }

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      msg: 'Server error updating task' 
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ 
        msg: 'Task not found' 
      });
    }

    // Check if user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ 
        msg: 'Not authorized to delete this task' 
      });
    }

    await Task.findByIdAndDelete(id);

    res.json({ 
      msg: 'Task removed successfully' 
    });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ 
      msg: 'Server error deleting task' 
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};