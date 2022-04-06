import * as api from 'api';
import { Dispatch } from 'react';

export const getLoggedInUser = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.getLoggedInUser(userId);
    dispatch({ type: 'GET_USER', payload: data });
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const updateUserInfo = (userId: string, userInfo: any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.updateUserInfo(userId, userInfo);
    dispatch({ type: 'UPDATE', payload: data });
    alert('Submitted successfully!');
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const updateUserPassword = (userId: string, userInfo: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.updateUserPassword(userId, userInfo);
    dispatch({ type: 'UPDATE', payload: data });
    localStorage.clear();
    setLocation('/');
    alert('Submitted successfully! Please log in.');
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const loginUser = (user: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.loginUser(user);
    dispatch({ type: 'AUTH', data });
    setLocation('/');
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const registerUser = (user: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.registerUser(user);
    dispatch({ type: 'AUTH', data });
    setLocation('/');
  } catch (error: any) {
    dispatch({ type: 'ERROR', error: error.response.data.message });
    alert(error.response.data.message);
  }
};

export const logoutUser = (setUser: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    setLocation('/');
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
