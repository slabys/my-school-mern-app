import { destroyCookie, setCookie } from 'utils/utils';

export default (state = { authData: null }, action: any) => {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, authData: action.payload };
    case 'UPDATE':
      return { ...state, authData: action.data };
    case 'AUTH':
      setCookie('profile', JSON.stringify({ ...action.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case 'LOGOUT':
      destroyCookie('profile');
      return { ...state, authData: null, loading: false, errors: null };
    case 'ERROR':
      return { ...state, authData: null, loading: false, errors: action.payload };
    default:
      return state;

  }
}
