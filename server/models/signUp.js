import mongoose from 'mongoose';

const signUpSchema = mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

export const SignUp = mongoose.model('SignUp', signUpSchema);
