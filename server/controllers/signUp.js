import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignUp } from '../models/signUp.js';

const secret = 'school';

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
