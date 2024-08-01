import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  avatar: String,
  password: String,
  token: String,
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema, "users");

export default User;