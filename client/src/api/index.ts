import axios from 'axios';

const url = 'http://localhost:5000/';

//Posts
export const fetchPosts = () => axios.get(url + 'posts');
export const createPost = (newPost: any) => axios.post(url + 'posts', newPost);

//SignUp
export const loginUser = () => axios.get(url + 'signup/login');
export const registerUser = (user: any) => axios.post(url + 'signup/register', user);

