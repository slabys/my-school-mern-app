import mongoose from 'mongoose';

const loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Login = mongoose.model('UserLogin', loginSchema);
