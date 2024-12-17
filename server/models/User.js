import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  phone: {
    type: String,
    // required: [true, 'Please provide a phone number'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },

  role: {
    type: String,
    enum: ['user', 'admin', 'guide'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.model('User', UserSchema);

export default User;