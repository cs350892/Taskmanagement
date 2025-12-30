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
  const { taskId, assignedUser } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, 
        { assignedUser }, 
        { new: true });

    if (!task) {

      return res.status(404).json({ 
        message: 'Task not found' 
    });
    }
    res.json(task);
  }
   catch (error) {
    res.status(500).json({
         message: 'Server error' 
        });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedUser', 
        'name email').populate('createdUser', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
    });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ 
        message: 'Server error'
     });
  }
};