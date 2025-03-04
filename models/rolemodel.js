// models/roleModel.js
import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  
    enum: ['admin', 'user', 'employee'],
    default:'user',  
  },
  description: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);
export default Role;
