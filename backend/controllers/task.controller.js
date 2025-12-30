import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
  const { title, description, assignedUser } = req.body;
  const createdUser = req.user.id;

  try {
    const task = new Task({
      title,
      description,
      assignedUser,
      createdUser
    });

    await task.save();
    res.status(201).json(task);
  }
  
  catch (error) {
    res.status(500).json({ 
        message: 'Server error' 
    });
  }
};

export const assignTask = async (req, res) => {
  const taskId = req.params.id;
  const { assignedUser } = req.body;

  try {
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    task.assignedUser = assignedUser;
    await task.save();

    const updatedTask = await Task.findById(taskId)
      .populate('assignedUser', 'name email')
      .populate('createdUser', 'name email');

    res.json(updatedTask);
  }
  catch (error) {
    console.log('Error assigning task:', error);
    res.status(500).json({
      message: 'Server error' 
    });
  }
};

export const getTasks = async (req, res) => {
  const loggedInUserId = req.user.id;
  
  try {
    const tasks = await Task.find({
      $or: [
        { createdUser: loggedInUserId },
        { assignedUser: loggedInUserId }
      ]
    })
    .populate('assignedUser', 'name email')
    .populate('createdUser', 'name email');
    
    res.json(tasks);
  } 
  catch (error) {
    console.log('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateStatus = async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  const loggedInUserId = req.user.id;

  try {
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    // Check if logged-in user is the assignedUser
    if (task.assignedUser.toString() !== loggedInUserId) {
      return res.status(403).json({ 
        message: 'Only assigned user can update task status' 
      });
    }

    task.status = status;
    await task.save();

    const updatedTask = await Task.findById(taskId)
      .populate('assignedUser', 'name email')
      .populate('createdUser', 'name email');

    res.json(updatedTask);
  } 
  catch (error) {
    console.log('Error updating status:', error);
    res.status(500).json({ 
      message: 'Server error'
    });
  }
};