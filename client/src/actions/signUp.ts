import * as api from 'api';
import { Dispatch } from 'react';

export const loginUser = () => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.loginUser();
    dispatch({ type: 'LOGIN', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (user: any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.registerUser(user);
    dispatch({ type: 'REGISTER', payload: data });
  } catch (error: any) {
    alert(error.message.includes('409') ? 'This email is already in use, please use another email address.' : error)
  }
};
