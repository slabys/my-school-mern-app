import * as api from 'api';
import { Dispatch } from 'react';

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
    dispatch({ type: 'AUTH', payload: data });
    setLocation('/');
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
