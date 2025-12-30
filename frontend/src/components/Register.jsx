import React, { useState } from 'react';
import { register } from '../services/api.js';
import '../App.css';

const Register = ({ onBackToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await register(name, email, password);
      
      alert('Registration successful! Please login now.');
      
      onBackToLogin();
    } 
    catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required 
        />
        
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        
        <button type="submit">Register</button>
      </form>
      <button onClick={onBackToLogin}>Back to Login</button>
    </div>
  );
};

export default Register;
