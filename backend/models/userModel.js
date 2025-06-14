import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // role:     { type: String, enum: ['User','Admin'], default: 'User' },

  dob:         Date,
  phone:       String,

  lastLogin: Date,

  avatar: {
    type: String,
    default: "avatar1", // You can set a default avatar ID or image name
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  streak: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
