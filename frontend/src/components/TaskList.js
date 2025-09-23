import React from 'react';
import { updateTask, deleteTask } from '../services/api';

const TaskList = ({ tasks, refreshTasks }) => {
  // Ensure tasks is always an array
  const taskArray = Array.isArray(tasks) ? tasks : [];
  
  console.log('TaskList received tasks:', taskArray); // Debug log

  const handleUpdate = async (id, status) => {
    try {
      await updateTask(id, { status });
      await refreshTasks();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed: ' + (err.response?.data?.msg || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await deleteTask(id);
      await refreshTasks();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + (err.response?.data?.msg || 'Unknown error'));
    }
  };

  if (!Array.isArray(taskArray) || taskArray.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-4">
          <div className="text-muted">
            <i className="fas fa-clipboard-list fa-3x mb-3 d-block"></i>
            <h5 className="card-title">No tasks yet</h5>
            <p className="card-text">Create your first task using the form above!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h5 className="mb-3">Task List ({taskArray.length})</h5>
      <div className="list-group">
        {taskArray.map((task) => (
          <div key={task._id} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">{task.title}</h6>
              <small className="text-muted">
                {new Date(task.dueDate).toLocaleDateString()}
              </small>
            </div>
            {task.description && (
              <p className="mb-1">{task.description}</p>
            )}
            <small className="text-muted">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </small>
            
            <div className="mt-3 d-flex gap-2">
              <select 
                className="form-select form-select-sm flex-grow-1" 
                value={task.status} 
                onChange={(e) => handleUpdate(task._id, e.target.value)}
              >
                <option value="Created">Created</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Postponed">Postponed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Done">Done</option>
              </select>
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => handleDelete(task._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;