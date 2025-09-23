import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('App init - Token found:', !!token); // Debug log
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  console.log('App render - isAuthenticated:', isAuthenticated); // Debug log

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? <Login setAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/register" 
            element={
              !isAuthenticated ? <Register setAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;