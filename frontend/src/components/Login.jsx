import React, { useState } from 'react';
import { login } from '../services/api.js';
import '../App.css';

const Login = ({ setToken, onShowRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const data = await login(email, password)

      localStorage.setItem('token', data.token)

      setToken(data.token)
    } catch (err) {
      alert('Login failed: ' + err.message)
    }
  }

  return (
    <div className="auth-container">
      <h2>Ekana Technologies Assignment</h2>
       <h2>Login Here </h2>
      
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
      
      <button onClick={onShowRegister}>Register</button>
    </div>
  )
}

export default Login