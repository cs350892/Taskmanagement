import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  if (token) {
    return <TaskList token={token} setToken={setToken} />;
  }

  if (showRegister) {
    return <Register onBackToLogin={handleBackToLogin} />;
  }

  return <Login setToken={setToken} onShowRegister={handleShowRegister} />;
}

export default App;