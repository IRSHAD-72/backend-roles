import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Role from "./rolemodel.js";

const authSchema = new mongoose.Schema({
  fristname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true},
  roles: { type:String, default:'user' },
  //dateOfBirth: { type: Date },
  //dateOfJoining: { type: Date },
});
//Hash password before saving the user document
authSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});
authSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);

export default Auth;
