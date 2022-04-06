import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: {
    id: String,
    nickname: String,
    email: String,
    phoneNumber: String,
  },
  categories: [String],
  images: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Posts = mongoose.model('Posts', postSchema);

export default Posts;
