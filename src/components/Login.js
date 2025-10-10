import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('user', username);
      navigate('/dashboard');
    } else {
      alert('Please enter your name');
    }
  };

  return (
    <div className="container">
      <h2>Login to ICT Upload Portal</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
