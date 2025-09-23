import React, { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Created');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createTask({ title, description, dueDate, status });
      await refreshTasks();
      setTitle(''); 
      setDescription(''); 
      setDueDate(''); 
      setStatus('Created');
    } catch (err) {
      console.error('Create task error:', err);
      setError(err.response?.data?.msg || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Add New Task</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter task title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              placeholder="Enter task description (optional)" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows="3"
              disabled={loading}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Due Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
                required 
                disabled={loading}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select 
                className="form-control" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading}
              >
                <option value="Created">Created</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Postponed">Postponed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <button 
            type="submit" 
            className="btn btn-success" 
            disabled={loading || !title || !dueDate}
          >
            {loading ? 'Creating...' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;