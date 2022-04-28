import axios from 'axios';
import { getCookie } from 'utils/utils';

const API = axios.create({baseURL: 'https://my-owe-school-app.herokuapp.com'}) //https://my-owe-school-app.herokuapp.com || http://localhost:5000

API.interceptors.request.use((req) => {
  if (getCookie('profile') && req.headers !== undefined) {
    req.headers.Authorization = `Bearer ${JSON.parse(getCookie('profile') as string).token }`;
  }
  return req;
});

//Posts
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost: any) => API.post('/posts', newPost);
export const deletePost = (postId: string) => API.delete(`/posts/${postId}`);
export const getCategories = () => API.get(`/posts/categories`);

//SignUp
export const getLoggedInUser = (userId: any) => API.get(`/signup/account/${userId}`);
export const updateUserInfo = (userId: any, userInfo: any) => API.patch(`/signup/account/${userId}`, userInfo);
export const updateUserPassword = (userId: any, userNewPassword: any) => API.patch(`/signup/changePassword/${userId}`, userNewPassword);
export const loginUser = (user: any) => API.post('/signup/login', user);
export const registerUser = (user: any) => API.post('/signup/register', user);

