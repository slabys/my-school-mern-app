import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignUp } from '../models/signUp.js';
import mongoose from 'mongoose';

const secret = 'school';

export const getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await SignUp.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, city, street, phoneNumber } = req.body;

  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  const updatedPost = { firstName, lastName, city, street, phoneNumber, _id: id };

  await SignUp.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  const user = await SignUp.findOne({ id });

  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const updatedPost = {password: hashedPassword, _id: id };

  await SignUp.findByIdAndUpdate(id, updatedPost);

  res.json(updatedPost);
}

export const postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await SignUp.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User doesn\'t exist' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '1h' });

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const postRegisterUser = async (req, res) => {
  const { nickname, email, password, firstName, lastName } = req.body;
  try {
    const userEmail = await SignUp.findOne({ email });
    if (userEmail) return res.status(409).send({ message: 'Already exists account with this email' });

    const userNickname = await SignUp.findOne({ nickname });
    if (userNickname) return res.status(409).send({ message: 'Already exists user with this nickname' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await SignUp.create({ email, password: hashedPassword, firstName, lastName, nickname });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    return error;
  }
};
