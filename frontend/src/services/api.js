
const API_BASE = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',

    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({ email, password })
  });


  if (!response.ok) throw new Error('Login failed');
  return await response.json();
};

export const getUsers = async (token) => {

  const response = await fetch(`${API_BASE}/users/`, {

    headers: { 'Authorization': `Bearer ${token}` }

  });
  if (!response.ok) throw new Error('Fetch users failed');


  return await response.json();
};

export const createTaskApi = async (data, token) => {

  const response = await fetch(`${API_BASE}/tasks/`, {

    method: 'POST',
    headers: { 'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(data)

  });
  if (!response.ok) throw new Error('Create task failed');
  return await response.json();
};

export const getTasksApi = async (token) => {

  const response = await fetch(`${API_BASE}/tasks/`, {

    headers: { 'Authorization': `Bearer ${token}` }

  });
  if (!response.ok) throw new Error('Fetch tasks failed');
  return await response.json();
};

export const updateStatusApi = async (taskId, status, token) => {

  const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 
        
        'Authorization': `Bearer ${token}` },

    body: JSON.stringify({ status })

  });

  
  if (!response.ok) throw new Error('Update status failed');
  return await response.json();
};