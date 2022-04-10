import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  prizeType: String,
  prize: String,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SignUp'
  },
  categories: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Posts = mongoose.model('Posts', postSchema);

export default Posts;
