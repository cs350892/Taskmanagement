import React, { useState, useEffect } from 'react';
import { getUsers, createTaskApi } from '../services/api.js';

const CreateTask = ({ token, refreshTasks }) => {
  const [users, setUsers] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedUser, setAssignedUser] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token)
        setUsers(data)
        
        if (data.length > 0) {
          setAssignedUser(data[0]._id)
        }
      } catch (err) {
        alert('Failed to fetch users')
      }
    }
    
    fetchUsers()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const taskData = {
        title: title,
        description: description,
        assignedUser: assignedUser
      }
      
      await createTaskApi(taskData, token)
      
      alert('Task created successfully')
      
      setTitle('')
      setDescription('')
      
      if (users.length > 0) {
        setAssignedUser(users[0]._id)
      }
      
      refreshTasks()
    } catch (err) {
      alert('Failed to create task: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Task Title" 
        required 
      />
      
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Task Description" 
        required 
        rows="3"
      />
      
      <select 
        value={assignedUser} 
        onChange={(e) => setAssignedUser(e.target.value)} 
        required
      >
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
      
      <button type="submit">Create Task</button>
    </form>
  )
}

export default CreateTask
