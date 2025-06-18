// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import './LoginPage.css'; // We'll create this CSS file next

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Make POST request to your backend's login endpoint
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });

      const { jwtToken, role } = response.data;

      // Store the token and role in localStorage for persistence
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('userRole', role);

      // Call the success callback passed from App.js (or similar parent)
      // This could update a global state or trigger a re-render
      if (onLoginSuccess) {
        onLoginSuccess(role);
      }

      // Redirect to admin dashboard after successful login
      navigate('/admin/dashboard'); // We'll create this route later

    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;