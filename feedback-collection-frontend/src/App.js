// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard'; // We'll create this next
import './App.css';

// A simple PrivateRoute component
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('jwtToken');
  const role = localStorage.getItem('userRole'); // Retrieve stored role

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // If token exists but role is not allowed, redirect to login or an unauthorized page
    return <Navigate to="/login" replace />; // Or /unauthorized
  }

  return children; // If authenticated and authorized, render children
};

function App() {
  // State to track login status and user role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check local storage on initial load
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Shelfex Feedback Tool</h1>
          <nav>
            <Link to="/">Feedback Form</Link>
            {isAuthenticated && userRole === 'ADMIN' ? (
              <>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </>
            ) : (
              <Link to="/login">Admin Login</Link>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<FeedbackForm />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            {/* You can add a 404 or unauthorized page here */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;