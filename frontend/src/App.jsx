import React, { useState } from 'react';
import Login from './components/Login.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      {token ? <TaskList token={token} setToken={setToken} /> : <Login setToken={setToken} />}
    </div>
  );
}

export default App;