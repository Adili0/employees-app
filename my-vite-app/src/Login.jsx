import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      });

      console.log('Login Successful:', response.data);

      // Set success message
      setSuccess(response.data.message);
      setError(''); // Clear any previous errors

      // Navigate to homepage
      navigate('/home');
    } catch (err) {
      // Handle errors properly
      setError(err.response?.data?.message || 'Login failed!');
      setSuccess(''); // Clear any previous success messages
      console.error('Error:', err.response || err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        {success && <p style={{ color: 'green' }}>{success}</p>} {/* Show success message */}
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
