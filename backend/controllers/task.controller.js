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