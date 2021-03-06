import mongoose from 'mongoose';

const signUpSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  nickname: {
    type: String,
    unique: true,
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
  phoneNumber: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const SignUp = mongoose.model('SignUp', signUpSchema);
