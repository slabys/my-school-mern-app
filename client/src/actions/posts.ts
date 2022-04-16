import * as api from 'api';
import { AppDispatch } from 'index';

export const getPosts = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const createPost = (post: any) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: 'CREATE', payload: data });
    return data
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const deletePost = (postId: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.deletePost(postId);
    dispatch({ type: 'DELETE', payload: data });
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
