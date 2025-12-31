import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id name email')
    
    if (!users) {

      return res.status(404).json({
         message: 'No users found'
         })
    }
    
    res.json(users)
  } 
  
  catch (error) {

    console.log('Error fetching users:', error)

    res.status(500).json({ 
      message: 'Server error' 
    })
  }
}
