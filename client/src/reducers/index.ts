import { combineReducers } from 'redux';

import posts from './posts';
import signUp from './signUp';

export interface IRootSelector {
  posts: any;
  signUp: {
    authData: UserData;
  };
}

export interface UserData {
  token: string,
  result: {
    id: string,
    firstName: string,
    lastName: string,
    nickname: string,
  }
}

export default combineReducers({
  posts,
  signUp,
});
