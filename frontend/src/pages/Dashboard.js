import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import CalendarView from '../components/CalendarView';
import { getTasks } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching tasks...');
      const { data } = await getTasks();
      
      // Handle both response formats
      const tasksArray = Array.isArray(data) ? data : (data.tasks || []);
      console.log('Tasks received:', tasksArray);
      
      setTasks(tasksArray);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Please try again.');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading tasks...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Tasks</h2>
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button className="btn btn-sm btn-outline-danger ms-2" onClick={fetchTasks}>
            Retry
          </button>
        </div>
      )}
      
      <TaskForm refreshTasks={fetchTasks} />
      <div className="row mt-4">
        <div className="col-md-6">
          <TaskList tasks={tasks} refreshTasks={fetchTasks} />
        </div>
        <div className="col-md-6">
          <CalendarView tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;