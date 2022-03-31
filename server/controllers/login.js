import { Login } from '../models/login.js';

export const getLoginUser = async (req, res) => {
  try {
    res.status(200).json(Login.find());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postLoginUser = async (req, res) => {
  const loginUser = new Login(req.body);

  try {
    await loginUser.save();
    res.status(201).json(loginUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
