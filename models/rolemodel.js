// models/roleModel.js
import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Ensures the role names are unique
    enum: ['admin', 'user', 'employee'],
    default:'user',  // You can add more roles as needed
  },
  description: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);
export default Role;
