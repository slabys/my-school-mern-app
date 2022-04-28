import * as api from 'api';
import { AppDispatch } from 'index';

export const getCategories = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.getCategories();
    dispatch({ type: 'FETCH_CATEGORIES', payload: data });
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
