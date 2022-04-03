import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile') && req.headers !== undefined) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') as string).token }`;
  }
  return req;
});

//Posts
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost: any) => API.post('/posts', newPost);

//SignUp
export const loginUser = (user: any) => API.post('/signup/login', user);
export const registerUser = (user: any) => API.post('/signup/register', user);

