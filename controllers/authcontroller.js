
import Auth from '../models/authModel.js'; 
import bcrypt from 'bcryptjs';    
import jwt from 'jsonwebtoken';
import Role from '../models/rolemodel.js';    

export const signup = async (req, res) => {
  const { fristname,lastname, email, password,role ='user' } = req.body;
     console.log("email received",email);
     console.log(req.body)

  try {
    
    const existingAuth = await Auth.findOne({ email });
    if (existingAuth) {
      return res.status(400).json({ message: 'User already exists' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAuth = new Auth({
      fristname,
      lastname,
      email,
      password: hashedPassword,
      role
    });

    await newAuth.save();

    const token = jwt.sign({ userId: newAuth._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: Auth._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile data', user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user data', error });
  }
};
export const  assignRoles = async (req, res) =>{
  const { userId, roleIds } = req.body;  // roleIds is an array of role ObjectIds

  // Validate input data
  if (!userId || !roleIds || !Array.isArray(roleIds)) {
    return res.status(400).json({ message: 'User ID and role IDs are required' });
  }

  try {
    // Find the user by userId
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the roles by their IDs
    const roles = await Role.find({ '_id': { $in: roleIds } });
    if (roles.length !== roleIds.length) {
      return res.status(400).json({ message: 'One or more roles not found' });
    }

    // Assign the roles to the user
    user.roles = roles;

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Roles assigned successfully', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error assigning roles' });
  }
};