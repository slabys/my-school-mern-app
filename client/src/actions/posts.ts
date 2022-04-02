import * as api from 'api';
import { Dispatch } from 'react';

export const getPosts = () => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post: any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
