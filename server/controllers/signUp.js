import { SignUp } from '../models/signUp.js';

export const postLoginUser = async (req, res) => {
  try {
    res.status(200).json(SignUp.find());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postRegisterUser = async (req, res) => {
  const registerUser = new SignUp(req.body);
  try {
    await registerUser.save();
    res.status(201).json(registerUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
