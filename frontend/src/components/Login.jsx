import React, { useState } from 'react';
import { login } from '../services/api.js';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password)

      localStorage.setItem('token', data.token)

      setToken(data.token)

    }
    
    catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      placeholder="Email" required />

      <input type="password"
       value={password} o
       nChange={(e) => setPassword(e.target.value)} 
       placeholder="Password" required />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;