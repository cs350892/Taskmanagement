import React, { useState, useEffect } from 'react';
import CreateTask from './CreateTask.jsx';
import { getTasksApi, updateStatusApi, getUsers, assignTaskApi, getProfile, deleteTaskApi } from '../services/api.js';

const TaskList = ({ token, setToken }) => {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const fetchTasks = async () => {
    try {
      const data = await getTasksApi(token)
      setTasks(data)
    } catch (err) {
      if (err.message.includes('401')) {
        localStorage.removeItem('token')
        setToken(null)
      } else {
        alert('Fetch tasks failed')
      }
    }
  }

  const fetchUsers = async () => {
    try {
      const data = await getUsers(token)
      setUsers(data)
    } catch (err) {
      alert('Failed to fetch users')
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const user = await getProfile(token)
      setCurrentUser(user)
    } catch (err) {
      console.log('Failed to fetch profile:', err)
    }
  }

  useEffect(() => {
    fetchTasks()
    fetchUsers()
    fetchCurrentUser()
  }, [token])

  const handleUpdateStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'
    
    try {
      await updateStatusApi(taskId, newStatus, token)
      fetchTasks()
    } catch (err) {
      alert('Update failed')
    }
  }

  const handleAssignTask = async (taskId, selectedUserId) => {
    try {
      await assignTaskApi(taskId, selectedUserId, token)
      fetchTasks()
      alert('Task assigned successfully')
    } catch (err) {
      alert('Assign failed: ' + err.message)
    }
  }

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?')
    
    if (!confirmDelete) {
      return
    }

    try {
      await deleteTaskApi(taskId, token)
      fetchTasks()
      alert('Task deleted successfully')
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <div className="create-task-section">
        <h3>Create New Task</h3>
        <CreateTask token={token} refreshTasks={fetchTasks} />
      </div>

      <div className="tasks-section">
        <h3>My Tasks</h3>
        
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks found</p>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => {
              const canUpdateStatus = currentUser && task.assignedUser._id === currentUser._id
              
              const isCreator = currentUser && task.createdUser._id === currentUser._id
              
              return (
                <div key={task._id} className="task-card">
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    
                    <span className={`status-badge ${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <p className="task-description">{task.description}</p>
                  
                  <div className="task-details">
                    <div className="detail-item">
                      <strong>Created by:</strong> {task.createdUser.name} ({task.createdUser.email})
                    </div>
                    
                    <div className="detail-item">
                      <strong>Assigned to:</strong> {task.assignedUser.name} ({task.assignedUser.email})
                    </div>
                  </div>

                  <div className="task-actions">
                    {canUpdateStatus && (
                      <button 
                        onClick={() => handleUpdateStatus(task._id, task.status)}
                        className="btn-primary"
                      >
                        Toggle Status
                      </button>
                    )}
                    
                    {isCreator && (
                      <div className="assign-section">
                        <select 
                          id={`assign-${task._id}`} 
                          defaultValue={task.assignedUser._id}
                          className="user-select"
                        >
                          {users.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                        
                        <button 
                          onClick={() => {
                            const selectElement = document.getElementById(`assign-${task._id}`)
                            const selectedUserId = selectElement.value
                            handleAssignTask(task._id, selectedUserId)
                          }}
                          className="btn-secondary"
                        >
                          Assign Task
                        </button>
                      </div>
                    )}

                    {isCreator && (
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        className="btn-delete"
                      >
                        Delete Task
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList