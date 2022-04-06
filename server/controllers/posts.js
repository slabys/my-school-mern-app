import Posts from '../models/Posts.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await Posts.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    await newPost
      .save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
